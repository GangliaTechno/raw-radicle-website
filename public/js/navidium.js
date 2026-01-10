var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function use_NVD_Console$1(...rest) {
}
const NVD_addProtection = async (variantId, quantity = 1, reload = false) => {
    const rs = await fd();if (rs == false) {return}
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;",
      Accept: "application/json"
    },
    body: JSON.stringify({
      id: variantId,
      quantity
    })
  };
  const cartData = await fetch("/cart/add.js", request);
  const cartJson = await cartData.json();
  if (cartJson.id) {
    localStorage.setItem("nvd_opted_out", false);
    localStorage.setItem("cart_protection", variantId);
    localStorage.removeItem("nvdconfig");
    location.href = "/checkout";
  }
};
const shopCurrency = nvdShopCurrency;
function NVD_formatMoney(cents, format = shopCurrency) {
  if (typeof cents === "string") {
    cents = cents.replace(".", "");
  }
  let value = "";
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || this.money_format;
  function defaultOption(opt, def) {
    return typeof opt === "undefined" ? def : opt;
  }
  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");
    if (isNaN(number) || number == null) {
      return 0;
    }
    number = (number / 100).toFixed(precision);
    const parts = number.split(".");
    const dollars = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${thousands}`
    );
    const cents2 = parts[1] ? decimal + parts[1] : "";
    return dollars + cents2;
  }
  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
    default:
      value = formatWithDelimiters(cents, 2);
      break;
  }
  return formatString.replace(placeholderRegex, value);
}
const NVD_getCartCallback = async (callback) => {
  const cart = await fetch("/cart.js");
  const cartData = await cart.json();
  if (callback)
    return callback(cartData);
  return cartData;
};
let NVD_updateCartLine = async (lineAttribute, cartItemsList, cartItems, qtyPlus, qtyMinus, rmvItem) => {
  await cartItemsList.forEach((item) => {
    use_NVD_Console$1(
      item.innerHTML.toString().includes("/products/navidium-shipping-protection")
    );
    if (item.innerHTML.toString().includes("/products/navidium-shipping-protection") == true) {
      item.style.display = "none !important";
      item.remove();
    }
    cartItems.forEach((cartItem, index) => {
      if (item.innerHTML.toString().includes(cartItem.url)) {
        use_NVD_Console$1(item.querySelector(`[${lineAttribute}]`));
        const lineItem = item.querySelectorAll(`[${lineAttribute}]`);
        const removeItem = item.querySelectorAll(rmvItem);
        const quantityPlus = item.querySelectorAll(qtyPlus);
        const quantityMinus = item.querySelectorAll(qtyMinus);
        if (lineItem) {
          lineItem.forEach(
            (item2) => item2.setAttribute(lineAttribute, index + 1)
          );
        }
        if (quantityPlus) {
          quantityPlus.forEach(
            (item2) => item2.setAttribute(
              "data-href",
              `/cart/change?quantity=${cartItem.quantity + 1}&line=${index + 1}`
            )
          );
        }
        if (quantityMinus) {
          quantityMinus.forEach(
            (item2) => item2.setAttribute(
              "data-href",
              `/cart/change?quantity=${cartItem.quantity - 1}&line=${index + 1}`
            )
          );
        }
        if (removeItem) {
          removeItem.forEach(
            (item2) => item2.setAttribute(
              "href",
              `/cart/change?line=${index + 1}&quantity=0`
            )
          );
        }
      }
    });
  });
};
const NVD_updateLiveCart = async (cartData = null) => {
  let cart = cartData;
  if (cart == null)
    cart = await NVD_getCartCallback();
  let curRate = Shopify.currency.rate;
  let cartTotal = cart.total_price;
  const protectionPrice = Number(localStorage.getItem("nvdProtectionPrice"));
  let totalPrice;
  const cartItems = cart.items;
  const totalCount = cart.item_count;
  const optedOut = localStorage.getItem("nvd_opted_out") ? Boolean(JSON.parse(localStorage.getItem("nvd_opted_out"))) : null;
  const lineAttribute = "data-line";
  const quantityPlus = '[data-action="increase-quantity"]';
  const quantityMinus = '[data-action="decrease-quantity"]';
  const removeItem = ".line-item__quantity-remove";
  const totalElem = document.querySelectorAll(nvdControls.subtotal_item);
  const cartCountElem = document.querySelectorAll(nvdControls.cartCounter);
  const cartItemNodes = document.querySelectorAll(".item__cart");
  const cartItemsList = Array.from(cartItemNodes);
  let currentCount;
  let XtotalPrice;
  const shopCurrency2 = nvdShopCurrency;
  if (optedOut == false) {
    currentCount = totalCount;
    XtotalPrice = cartTotal + protectionPrice * parseFloat(curRate) * 100;
    totalPrice = NVD_formatMoney(XtotalPrice, shopCurrency2);
  }
  if (optedOut == true || optedOut == null) {
    totalPrice = NVD_formatMoney(cart.total_price, shopCurrency2);
    currentCount = totalCount;
  }
  if (cart.item_count == 0)
    currentCount = 0;
  if (totalElem)
    totalElem.forEach((elem) => elem.innerHTML = totalPrice);
  if (cartCountElem) {
    cartCountElem.forEach(
      (elem) => elem.innerHTML = `(${currentCount} items)`
    );
  }
  await NVD_updateCartLine(
    lineAttribute,
    cartItemsList,
    cartItems,
    quantityPlus,
    quantityMinus,
    removeItem
  );
};
let NVD_buildWidget = (shopConfig, priceFromApi, nvdVariant, checked) => {
  const {
    nvd_name,
    nvd_subtitle,
    nvd_description,
    widget_icon,
    nvd_message,
    learnMore
  } = shopConfig;
  const shopCurrency2 = nvdShopCurrency;
  const protectionPrice = priceFromApi;
  const protectionVariant = nvdVariant;
  const protectionCheckbox = checked ? "checked" : "";
  const selectedStyle = protectionCheckbox ? "'display: block'" : "'display: none'";
  const diselectedStyle = protectionCheckbox ? "'display: none'" : "'display: block'";
  let learnMoreMarkup = "";
  if (learnMore.length !== 0 && learnMore.includes("https://")) {
    learnMoreMarkup = `<button type="button" class="btnCstm tooltipCstm">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 0C3.36433 0 0 3.36433 0 7.5C0 11.6357 3.36433 15 7.5 15C11.6357 15 15 11.6357 15 7.5C15 3.36433 11.6357 0 7.5 0ZM7.5 11.875C7.15496 11.875 6.87504 11.595 6.87504 11.25C6.87504 10.905 7.15496 10.625 7.5 10.625C7.84504 10.625 8.12496 10.905 8.12496 11.25C8.12496 11.595 7.84504 11.875 7.5 11.875ZM8.48934 7.90123C8.26813 8.00308 8.12496 8.22624 8.12496 8.46943V8.75004C8.12496 9.09496 7.84561 9.375 7.5 9.375C7.15439 9.375 6.87504 9.09496 6.87504 8.75004V8.46943C6.87504 7.73998 7.30373 7.0713 7.96566 6.76563C8.60252 6.47255 9.06246 5.69435 9.06246 5.31246C9.06246 4.45129 8.36185 3.75 7.5 3.75C6.63815 3.75 5.93754 4.45129 5.93754 5.31246C5.93754 5.6575 5.65807 5.93754 5.31246 5.93754C4.96685 5.93754 4.6875 5.6575 4.6875 5.31246C4.6875 3.7619 5.94933 2.49996 7.5 2.49996C9.05067 2.49996 10.3125 3.7619 10.3125 5.31246C10.3125 6.15692 9.57996 7.39815 8.48934 7.90123Z" fill="#212B36">
                        </path>
                    </svg>
                    <span class="toolltiptextCstm"><a style="color:#fff" href="${learnMore}" target="_blank">${learnMore}</a></span>
                </button>`;
  } else if (learnMore.length !== 0) {
    learnMoreMarkup = `<button type="button" class="btnCstm tooltipCstm">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 0C3.36433 0 0 3.36433 0 7.5C0 11.6357 3.36433 15 7.5 15C11.6357 15 15 11.6357 15 7.5C15 3.36433 11.6357 0 7.5 0ZM7.5 11.875C7.15496 11.875 6.87504 11.595 6.87504 11.25C6.87504 10.905 7.15496 10.625 7.5 10.625C7.84504 10.625 8.12496 10.905 8.12496 11.25C8.12496 11.595 7.84504 11.875 7.5 11.875ZM8.48934 7.90123C8.26813 8.00308 8.12496 8.22624 8.12496 8.46943V8.75004C8.12496 9.09496 7.84561 9.375 7.5 9.375C7.15439 9.375 6.87504 9.09496 6.87504 8.75004V8.46943C6.87504 7.73998 7.30373 7.0713 7.96566 6.76563C8.60252 6.47255 9.06246 5.69435 9.06246 5.31246C9.06246 4.45129 8.36185 3.75 7.5 3.75C6.63815 3.75 5.93754 4.45129 5.93754 5.31246C5.93754 5.6575 5.65807 5.93754 5.31246 5.93754C4.96685 5.93754 4.6875 5.6575 4.6875 5.31246C4.6875 3.7619 5.94933 2.49996 7.5 2.49996C9.05067 2.49996 10.3125 3.7619 10.3125 5.31246C10.3125 6.15692 9.57996 7.39815 8.48934 7.90123Z" fill="#212B36">
                        </path>
                    </svg>
                    <span class="toolltiptextCstm">${learnMore}</span>
                </button>`;
  }
  const snippet = `
  <div class="appearance-right-previw" id="nvd-widget-cart">
  <div class="d-flexCstm">
    <div class="flex-shrink-0Cstm">
      <div class="form-checkCstm form-switchCstm">
      <input class="forms-check-inputCstm" type="checkbox" id="shippingProtectionCheckBox"
       ${protectionCheckbox} data-protected-variant="${protectionVariant}" 
  }/>
            <div class='img'>
            <img class="navidium-shipping-icon" width="auto" height="auto" src="${widget_icon}" alt="Navidium icon"/>
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.8056 0.867554L0.00976562 4.2023C0.218188 8.16232 -0.177814 14.415 0.635031 17.1245C1.32282 19.4171 7.16558 23.8634 9.8056 25.6698C11.9593 23.9329 17.3442 20.4317 18.3509 18.1666C20.0183 14.415 19.8793 8.09285 19.6014 4.2023L9.8056 0.867554Z"
                fill="#6D7175"></path>
              <path d="M5.01172 13.1644L7.92963 16.7076L14.3907 10.0381" stroke="white" stroke-width="1.66738"
                stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            </div>
      </div>
    </div>
    <div class="flex-grow-1Cstm ms-3Cstm">
       <h4>${nvd_name}
         ${learnMoreMarkup}
       </h4>
       <p>${nvd_subtitle}
       </p>
       <div class="d-flexCstm lrn">
        <p id="nvdModal">Learn More</p>
         <p class="pr"><strong class="shipping-protection-price">
           ${NVD_formatMoney(
    protectionPrice * 100 * parseFloat(Shopify.currency.rate),
    shopCurrency2
  )}
         </strong></p>
        
       </div>
       <p class="nvd-selected" style=${selectedStyle}>${nvd_description}</p>
       <p class="nvd-dis-selected" style=${diselectedStyle}>${nvd_message}</p>
    </div>
  </div>
</div>
   `;
  return snippet;
};
window.addEventListener(
  "click",
  (ev) => {
    const navidiumTriggers = Array.from(
      document.querySelectorAll("#shippingProtectionCheckBox")
    );
    const elm = ev.target;
    if (navidiumTriggers.includes(elm)) {
      const checked = ev.target.checked;
      console.log(checked);
      if (!checked) {
        localStorage.setItem("nvd_opted_out", true);
        NVD_nvd_init();
        NVD_updateLiveCart();
      } else {
        localStorage.setItem("nvd_opted_out", false);
        NVD_nvd_init();
        NVD_updateLiveCart();
      }
    }
  },
  true
);
function NVD_findClosest(arr, target, adjustment = "rounding_down") {
  if (!arr || !arr.length)
    return null;
  let toMatch = parseFloat(target);
  let finalOutput = 0;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let current = arr[i];
    let next = arr[i + 1];
    if (toMatch >= current && toMatch <= next) {
      if (adjustment === "rounding_down")
        finalOutput = current;
      if (adjustment === "rounding_up")
        finalOutput = next;
      break;
    } else if (toMatch <= current) {
      finalOutput = current;
      break;
    }
  }
  return finalOutput;
}
const NVD_calculateProtection = async (cartTotal, nvdConfig) => {
  let conversionRate = parseFloat(Shopify.currency.rate);
  let convertedTotal = cartTotal / conversionRate;
  let protection_type = nvdConfig.protection_type;
  let protection_percentage = nvdConfig.protection_percentage;
  let protectionId;
  let protectionPrice;
  let minPrice = Number(nvdConfig.min_protection_price);
  let maxPrice = Number(nvdConfig.max_protection_price);
  let minId = nvdConfig.min_protection_variant;
  let maxId = nvdConfig.max_protection_variant;
  let protectionVariants = nvdConfig.protection_variants;
  let PriceRounding = nvdConfig.rounding_value;
  protection_type = parseInt(protection_type);
  console.log("113 protection_type", protection_type);
  if (protection_type == 1) {
    let ourProtectionPrice = convertedTotal * protection_percentage / 100;
    ourProtectionPrice = ourProtectionPrice.toFixed(2);
    if (ourProtectionPrice < minPrice) {
      console.log("Our protection price is less than minimum");
      protectionPrice = minPrice;
      protectionId = minId;
      return {
        price: protectionPrice,
        variant_id: protectionId
      };
    } else if (ourProtectionPrice > maxPrice) {
      console.log("Our protection price is greater than maximum");
      protectionPrice = maxPrice;
      protectionId = maxId;
      return {
        price: protectionPrice,
        variant_id: protectionId
      };
    } else {
      console.log("calculating protection");
      const priceArray = Object.keys(protectionVariants);
      priceArray.sort((a, b) => a - b);
      protectionPrice = NVD_findClosest(
        priceArray,
        ourProtectionPrice,
        PriceRounding
      );
      if (protectionPrice == 0) {
        return {
          price: maxPrice,
          variant_id: maxId
        };
      }
      protectionId = protectionVariants[protectionPrice];
      console.log({
        price: protectionPrice,
        variant_id: protectionId
      });
      return {
        price: protectionPrice,
        variant_id: protectionId
      };
    }
  } else {
    console.log("protection is static");
    let apiURL = await fetch(
      `https://web.archive.org/web/20230519193714/https://app.navidiumapp.com/api/variant-id-checker-api-march6.php?shop_url=${nvdShop}&price=` + cartTotal
    );
    let data = apiURL.json();
    return data;
  }
};
const NVD_adjustProtectionQuantity = async (variantId, quantity, reload = false) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;",
      Accept: "application/json"
    },
    body: JSON.stringify({
      id: String(variantId),
      quantity: String(quantity)
    })
  };
  const cartData = await fetch("/cart/change.js", request);
  const cartJson = await cartData.json();
  use_NVD_Console(
    "%cnew cart instance after duplicate protection quantity decrease",
    "color:yellow",
    cartJson
  );
  console.dir(cartJson);
  NVD_updateLiveCart(cartJson);
  if (reload) {
    location.reload();
  } else {
    return cartJson;
  }
};
const NVD_prefetch = async (callback) => {
  let nvdConfig = localStorage.getItem("nvdconfig") ? JSON.parse(localStorage.getItem("nvdconfig")) : null;
  if (nvdConfig) {
    const today = new Date();
    const expiration = new Date(nvdConfig.expiration);
    if (today > expiration) {
      localStorage.removeItem("nvdconfig");
      nvdConfig = null;
      NVD_prefetch();
    }
  } else {
    await fetch(
      `https://web.archive.org/web/20230519193714/https://app.navidiumapp.com/api/widget-v8.php?shop_url=${nvdShop}`
    ).then((res) => res.json()).then((initialData) => {
      const today = new Date();
      const shopConfig = {
        success: initialData.success,
        show_on_cart: initialData.nvd_show_cart,
        show_on_checkout: initialData.nvd_show_checkout,
        widget_location: initialData.widget_location,
        auto_insurance: initialData.nvd_auto_insurance,
        nvd_name: initialData.nvd_name,
        nvd_subtitle: initialData.nvd_subtitle,
        widget_icon: initialData.nvd_widget_icon,
        learnMore: initialData == null ? void 0 : initialData.nvd_learn_more,
        nvd_description: initialData.nvd_description,
        nvd_message: initialData.nvd_message,
        protection_variants: initialData.nvd_variants,
        product_exclusion: initialData.product_exclusion.split(","),
        min_protection_price: initialData.min_protection_value,
        max_protection_price: initialData.max_protection_value,
        protection_type: initialData.nvd_protection_type,
        protection_percentage: initialData.nvd_protection_type_value,
        min_protection_variant: initialData.min_variant_id,
        max_protection_variant: initialData.max_variant_id,
        expiration: today.setDate(today.getDate() + 3),
        previewMode: initialData.nvd_preview_mode,
        rounding_value: initialData.rounding_value,
        maxThreshold: initialData.threshold_value
      };
      localStorage.setItem("nvdconfig", JSON.stringify(shopConfig));
      if (callback)
        return callback();
    }).catch((err) => {
      use_NVD_Console$1(
        "%c navidium error",
        "color: yellow; background-color: red; font-size: 12px",
        err.message
      );
    });
  }
};

const NVD_checkCart = async (cartData, callback = null) => {
  const currency = await cartData.currency;
  if (cartData.items.length != 0) {
    const { items } = cartData;
    let total = parseFloat(cartData.total_price);
    const nvdCounterArray = [];
    let recheck = false;
    let dupeVariant;
    const shopConfig = localStorage.getItem("nvdconfig") ? JSON.parse(localStorage.getItem("nvdconfig")) : null;
    const excludedSKUs = shopConfig.product_exclusion;
    if (!shopConfig) {
      await NVD_prefetch();
    }
    await items.forEach((item) => {
      if (item.handle.includes("navidium-shipping-protection")) {
        nvdCounterArray.push(item.variant_id);
        localStorage.setItem("cart_protection", item.variant_id);
        total -= item.final_line_price;
        if (item.quantity > 1) {
          recheck = true;
          dupeVariant = item.variant_id;
        }
      } else {
        excludedSKUs.forEach((sku) => {
          if (item.product_type === "Digital Product") {
            use_NVD_Console$1(
              "%c Navidium Message:Product is excluded",
              "color: yellow; background-color: blue; font-size: 16px",
              item.sku,
              item.final_price
            );
            total -= item.final_line_price;
          } else if (item.gift_card || item.sku === sku) {
            use_NVD_Console$1(
              "%c Navidium Message:Product is excluded",
              "color: yellow; background-color: blue; font-size: 16px",
              item.sku,
              item.final_price
            );
            total -= item.final_line_price;
          }
        });
      }
    });
    if (recheck === true) {
      NVD_adjustProtectionQuantity(dupeVariant, 0, false);
      NVD_getCartCallback(NVD_checkCart);
    }
    if (nvdCounterArray.length > 1) {
      nvdCounterArray.forEach((item) => {
        NVD_adjustProtectionQuantity(item, 0);
        localStorage.removeItem("cart_protection");
        recheck = false;
      });
    }
    if (nvdCounterArray.length == 0) {
      localStorage.removeItem("cart_protection");
    }
    if (nvdCounterArray.length == items.length) {
      fetch("/cart/clear.js").then((res) => {
        window.location.reload();
        localStorage.removeItem("cart_protection");
      });
    }
    return {
      total: parseFloat(total),
      currency
    };
  }
  return {
    total: 0,
    currency
  };
};
const fd=async()=>{let t=sessionStorage.getItem("guardStart");if(null==t)return sessionStorage.setItem("guardStart",Date.now()),!0;if(null!=t){let t=sessionStorage.getItem("guardStart");t=Number(t);let e=Date.now();return t+=5e3,!(e<t)&&(sessionStorage.setItem("guardStart",Date.now()),!0)}};
const NVD_checkWidgetView = () => {
  const optedOut = localStorage.getItem("nvd_opted_out");
  const selected = document.querySelector(".nvd-selected");
  const deselected = document.querySelector(".nvd-dis-selected");
  if (optedOut == "true") {
    if (selected)
      selected.style.display = "none";
    if (deselected)
      deselected.style.display = "block";
  } else {
    if (selected)
      selected.style.display = "block";
    if (deselected)
      deselected.style.display = "none";
  }
};

const NVD_nvd_init = async () => {


  localStorage.setItem("nvd_running", true);
  const shopConfig = localStorage.getItem("nvdconfig") ? JSON.parse(localStorage.getItem("nvdconfig")) : null;
  if (shopConfig)
    ;
  else {
    await NVD_prefetch(NVD_nvd_init);
    return;
  }
  const cartProtectionVariant = localStorage.getItem("cart_protection") ? localStorage.getItem("cart_protection") : null;
  const optedOut = JSON.parse(localStorage.getItem("nvd_opted_out"));
  let showWidget = true;
  if (shopConfig.show_on_cart === "0")
    showWidget = false;
  const { success } = shopConfig;
  let checked;
  let nvdVariant;
  if (showWidget && success) {
    const cart = await NVD_getCartCallback(NVD_checkCart);
    console.log("554",{cart})
    const cartTotal = await cart.total / 100;
    console.log("555",{cartTotal})
    const getProtection = await NVD_calculateProtection(cartTotal, shopConfig);
    console.log({ getProtection });
    const variantFromApi = await getProtection.variant_id;
    const priceFromApi = await getProtection.price;
    shopConfig.auto_insurance;
    let maxThresholdPrice = parseFloat(shopConfig.maxThreshold);
    maxThresholdPrice = (maxThresholdPrice * parseFloat(Shopify.currency.rate)).toFixed(2);
    const cartEmpty = cartTotal === 0;
    const widgetPlaceHolders = document.querySelectorAll(".nvd-mini");
    widgetPlaceHolders.length > 0;
    localStorage.setItem("nvdProtectionPrice", priceFromApi);
    localStorage.setItem("nvdVariant", variantFromApi);
    if (cartEmpty || maxThresholdPrice <= cartTotal) {
      console.log(
        "cart total is zero or max threshold true. No need to add protection"
      );
      return;
    }
    var auto_insurance_checker = parseInt(shopConfig.auto_insurance);
    if (auto_insurance_checker != 1) {
      checked = false;
    }
    if (optedOut == true || optedOut == null) {
      checked = false;
    } else {
      checked = true;
    }
    if (auto_insurance_checker == 1 && optedOut == null) {
      checked = true;
    }
    if (auto_insurance_checker == 1 && optedOut == false) {
      checked = true;
    }
    if (cartProtectionVariant) {
      if (cartProtectionVariant === variantFromApi) {
        nvdVariant = cartProtectionVariant;
        if (document.querySelector(".nvd-mini")) {
          document.querySelectorAll(".nvd-mini").forEach((item) => {
            item.innerHTML = NVD_buildWidget(
              shopConfig,
              priceFromApi,
              nvdVariant,
              checked ? "checked" : ""
            );
          });
        }
        NVD_checkWidgetView();
      } else {
        nvdVariant = variantFromApi;
        if (document.querySelector(".nvd-mini")) {
          document.querySelectorAll(".nvd-mini").forEach((item) => {
            item.innerHTML = NVD_buildWidget(
              shopConfig,
              priceFromApi,
              nvdVariant,
              checked ? "checked" : ""
            );
          });
        }
        NVD_checkWidgetView();
      }
    } else if (checked) {
      nvdVariant = variantFromApi;
      localStorage.setItem("nvd_opted_out", false);
      if (document.querySelector(".nvd-mini")) {
        document.querySelectorAll(".nvd-mini").forEach((item) => {
          item.innerHTML = NVD_buildWidget(
            shopConfig,
            priceFromApi,
            nvdVariant,
            checked ? "checked" : ""
          );
        });
      }
      NVD_checkWidgetView();
    } else {
      nvdVariant = variantFromApi;
      if (document.querySelector(".nvd-mini")) {
        document.querySelectorAll(".nvd-mini").forEach((item) => {
          console.log({ shopConfig, priceFromApi, nvdVariant, checked });
          item.innerHTML = NVD_buildWidget(
            shopConfig,
            priceFromApi,
            nvdVariant,
            checked ? "checked" : ""
          );
        });
      }
      NVD_checkWidgetView();
    }
  }
  console.timeEnd("nvd_init");
  localStorage.setItem("nvd_running", false);
  NVD_updateLiveCart();
};
(function injectCss() {
  const cssId = "nvd-styles";
  if (!document.getElementById(cssId)) {
    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://web.archive.org/web/20230519193714/https://navidiumcheckout.com/cdn/nvd-styles-regular.css";
    link.media = "all";
    head.appendChild(link);
  }
})();
(function storeCurrency() {
  const currency = Shopify.currency;
  localStorage.setItem("nvdCurrency", JSON.stringify(currency));
})();
nvdShopCurrency;
async function removeNavidium() {
  fetch("/cart.js").then((res) => res.json()).then((cart) => {
    const { items } = cart;
    items.forEach(async (item) => {
      if (item.handle.includes("navidium")) {
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json;",
            Accept: "application/json"
          },
          body: JSON.stringify({
            id: String(item.variant_id),
            quantity: 0
          })
        };
        fetch("/cart/change.js", request).then((res) => res.json()).then((dt) => location.reload());
      }
    });
  });
}
removeNavidium();
function debounce(callback, wait=1000) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}
window.addEventListener("DOMContentLoaded", () => {
  NVD_prefetch();
  new Promise(function(resolve, reject) {
    setTimeout(NVD_nvd_init, 0);
  }).then(function() {
    NVD_updateLiveCart(null);
    console.log("Wrapped setTimeout after 2000ms");
  });
});
window.addEventListener("load", (event) => {
  setTimeout(NVD_nvd_init, 1500);
  console.log("Init after 1500ms");
});
window.addEventListener(
  "click",
  (ev) => {
    const navidiumTriggers = Array.from(
      document.querySelectorAll(nvdControls.clickTriggers)
    );
    const elm = ev.target;
    if (navidiumTriggers.includes(elm)) {
      let checkoutBtn = document.querySelectorAll('[name="checkout"]');
      if (checkoutBtn)
        checkoutBtn.forEach((elem) => elem.disabled = true);
      setTimeout(() => {
        NVD_nvd_init().then(() => {
          if (checkoutBtn)
            checkoutBtn.forEach((elem) => elem.disabled = false);
          NVD_updateLiveCart();
        }).catch((err) => {
          if (checkoutBtn)
            checkoutBtn.forEach((elem) => elem.disabled = false);
        });
      }, 2e3);
    }
  },
  true
);
window.addEventListener(
  "change",
  (ev) => {
    const navidiumTriggers = Array.from(
      document.querySelectorAll(nvdControls.changeTrigger)
    );
    const elm = ev.target;
    if (navidiumTriggers.includes(elm)) {
      let checkoutBtn = document.querySelectorAll('[name="checkout"]');
      if (checkoutBtn)
        checkoutBtn.forEach((elem) => elem.disabled = true);
      setTimeout(() => {
        console.log("I am running");
        NVD_nvd_init().then(() => {
          if (checkoutBtn)
            checkoutBtn.forEach((elem) => elem.disabled = false);
          updateLiveCart();
        }).catch((err) => {
          if (checkoutBtn)
            checkoutBtn.forEach((elem) => elem.disabled = false);
        });
      }, 2e3);
    }
  },
  true
);
if (/Android|webOS|Mac|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)) {
  $(document).one("click", nvdControls.CheckoutBtns, function(e) {
    console.log("Mini Device:: Clicked on checkout");
    e.preventDefault();
    let checked = document.querySelector("#shippingProtectionCheckBox").checked;
    if (localStorage.getItem("nvdVariant") != null) {
      let variantId = localStorage.getItem("nvdVariant");
      if (!checked) {
        return;
      } else {
        NVD_addProtection(variantId).then((cart) => {
          return;
        });
      }
    } else {
      return;
    }
  });
} else {
  window.addEventListener(
    "click",
    debounce((ev) => {
      const navidiumTriggers = Array.from(
        document.querySelectorAll(nvdControls.CheckoutBtns)
      );
      const elm = ev.target;
      if (navidiumTriggers.includes(elm)) {
        console.log("checkout button clicked");
        ev.preventDefault();
        let checked = document.querySelector(
          "#shippingProtectionCheckBox"
        ).checked;
        if (localStorage.getItem("nvdVariant") != null) {
          let variantId = localStorage.getItem("nvdVariant");
          if (!checked) {
            return;
          } else {
            NVD_addProtection(variantId).then((cart) => {
              return;
            });
          }
        } else {
          return;
        }
      }
    }),
    nvdControls.forceTrigger
  );
}

//Modal Of Learn More

window.onclick = e => {  
    if (e.target.id == 'nvdModal') {       
        document.getElementById("nvdModalx").classList.toggle("openNvdModal")
    }
   if (e.target.id == 'nvdLearnImage') {       
        document.getElementById("nvdModalx").classList.toggle("openNvdModal")
    }
  if (e.target.id == 'nvdModalx') {       
        document.getElementById("nvdModalx").classList.toggle("openNvdModal")
    }
  if (e.target.id == 'nvdImagHolderx') {       
        document.getElementById("nvdModalx").classList.toggle("openNvdModal")
    }
    
}
}
/*
     FILE ARCHIVED ON 19:37:14 May 19, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:49:10 Jan 08, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.021
  exclusion.robots: 0.145
  exclusion.robots.policy: 0.116
  esindex: 0.015
  cdx.remote: 23.355
  LoadShardBlock: 92.054 (3)
  PetaboxLoader3.datanode: 1032.676 (5)
  load_resource: 1051.959
  PetaboxLoader3.resolve: 55.842
  loaddict: 30.778
*/