import { fetchProductAndStore } from "@/services/guides.service";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", { ...options, timeZone: 'UTC' });
}

export async function getGuideHtml(content: any) {
  let parsedDescription: any;
  let cardInfo: any;
  try {
    parsedDescription = JSON.parse(content);

    const { productIds, storeIds } = extractIds(parsedDescription);
    cardInfo = await fetchProductAndStore(productIds, storeIds);
  } catch (error) {
    console.error("Failed to parse description:", error);
    return "";
  }

  let currentHTML = "";

  parsedDescription?.blocks?.forEach((obj: any) => {
    switch (obj?.type) {
      case "paragraph":
        currentHTML += `<p class="text-base md:text-lg font-normal py-2 text-gray-800 leading-relaxed">${obj?.data?.text}</p>`;
        break;
      case "image":
        currentHTML += `<div class="my-6">
                          <img class="w-full max-w-md mx-auto rounded-lg shadow-md" src="${obj?.data?.file?.url}" alt="${obj?.data?.caption}" />
                        </div>`;
        break;
      case "header":
        const level = obj.data.level;
        if (level >= 1 && level <= 6) {
          currentHTML += `<h${level} class="text-${
            level === 1 ? "3xl" : level === 2 ? "2xl" : "xl"
          } font-bold text-gray-900 my-4">${obj.data.text}</h${level}>`;
        }
        break;
      case "raw":
        currentHTML += `${obj?.data?.html}`;
        break;
      case "list":
        const listItems = obj?.data.items
          ?.map(
            (item: { content: string }) =>
              `<li class="py-1">${item.content}</li>`
          )
          .join("");

        const isUnordered = obj?.data.style === "unordered";

        const listTag = isUnordered ? "ul" : "ol";
        const listClass = isUnordered
          ? "list-disc list-inside pl-5 space-y-1 text-gray-600"
          : "list-decimal list-inside pl-5 space-y-1 text-gray-600";

        currentHTML += `<${listTag} class="${listClass}">
                          ${listItems}
                        </${listTag}>`;
        break;
      case "quote":
        currentHTML += `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 bg-blue-50 p-3 rounded-lg shadow-md">
                          <p>${obj?.data?.text}</p>
                        </blockquote>`;
        break;
      case "warning":
        currentHTML += `<section class="my-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-md">
                          <div class="text-yellow-900 font-semibold text-lg">${obj?.data?.title}</div>
                          <p>${obj?.data?.message}</p>
                        </section>`;
        break;
      case "checklist":
        currentHTML += `<div class="flex items-center space-x-3 my-2">
                          <input type="checkbox" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" ${
                            obj?.data?.items[0]?.checked ? "checked" : ""
                          } id="${obj?.id}">
                          <label for="${obj?.id}" class="text-gray-800">${
          obj?.data?.items[0]?.text
        }</label>
                        </div>`;
        break;
      case "delimiter":
        currentHTML += `<div class="my-6">
                          <div class="h-px bg-gray-300"></div>
                        </div>`;
        break;
      case "code":
        currentHTML += `<pre class="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-800"><code>${obj.data.code}</code></pre>`;
        break;
      case "table":
        const tableData = obj.data.content;
        const withHeadings = obj.data.withHeadings;

        currentHTML +=
          "<div class='overflow-x-auto'><table class='min-w-full divide-y divide-gray-200'>";

        for (let i = 0; i < tableData.length; i++) {
          currentHTML += "<tr>";
          for (let j = 0; j < tableData[i].length; j++) {
            if (withHeadings && i === 0) {
              currentHTML += `<th class="px-4 py-2 bg-gray-200 text-gray-800 font-semibold">${tableData[i][j]}</th>`;
            } else {
              currentHTML += `<td class="px-4 py-2 border-b border-gray-200">${tableData[i][j]}</td>`;
            }
          }
          currentHTML += "</tr>";
        }

        currentHTML += "</table></div>";
        break;
      case "productPlugin":
        const productId = obj?.data?.id;
        const productData = cardInfo.products.find(
          (product: any) => product.id === productId
        );

        if (productData) {
          const productCardHTML = getProductHtml(productData);
          currentHTML += productCardHTML;
        }
        break;
      case "StorePlugin":
        const storeId = obj?.data?.id;
        const storeData = cardInfo.stores.find(
          (store: any) => store.id === storeId
        );

        if (storeData) {
          const storeCardHTML = getStoreHtml(storeData);
          currentHTML += storeCardHTML;
        }
        break;

      default:
        break;
    }
  });

  return currentHTML;
}

export function extractIds(jsonData: any) {
  const productIds: any = [];
  const storeIds: any = [];

  jsonData.blocks.forEach((block: any) => {
    if (block.type === "productPlugin" && block.data && block.data.id) {
      productIds.push(block.data.id);
    } else if (block.type === "StorePlugin" && block.data && block.data.id) {
      storeIds.push(block.data.id);
    }
  });

  return { productIds, storeIds };
}

function getStoreHtml(storeData: any) {
  return `
        <div>
          <div class="items-center bg-gray-50 rounded-lg shadow sm:flex">
              <a href="#">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="${process.env.NEXT_PUBLIC_ASSET_URL}${storeData?.storeLogo}" alt="Bonnie Avatar">
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900">
                      <a href="#">${storeData?.name}</a>
                  </h3>
                  <p class="mt-3 mb-4 font-light text-gray-500">${storeData?.description}</p>
                  <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Visit Store</a>
              </div>              
        </div> 
`;
}

function getProductHtml(productData: any) {
  return `
  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
    <a href="#">
        <img class="p-8 rounded-t-lg" src="${
          process.env.NEXT_PUBLIC_ASSET_URL
        }${productData?.images[0].path}" alt="product image" />
    </a>
    <div class="px-5 pb-1 flex items-center mt-2">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounde">${
              productData?.category?.name
            }</span>
        </div>
    <div class="px-5 pb-5 flex flex-col gap-3">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900">${
              productData?.name
            }</h5>
        </a>        
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900">${formatPrice(
              productData?.price,
              productData?.currencyCode
            )}</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Buy Now</a>
        </div>
    </div>
  </div>
`;
}

export function formatPrice(price: number = 0, currencyCode?: string): string {
  if (!currencyCode) currencyCode = "KWD";
  try {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    });
    return formatter.format(price);
  } catch (error) {
    console.error(`Error formatting price: ${error}`);
    return `${currencyCode} ${price.toFixed(2)}`;
  }
}
