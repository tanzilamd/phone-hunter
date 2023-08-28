// Brands: iphone, samgsung, oppo, huawei
const loadPhone = async (searchName = "iphone", isShowAll) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchName}`
    );
    const data = await res.json();
    const phone = data.data;

    displayPhone(phone, isShowAll);
};

// Display with html element
const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");

    // clear container for search
    phoneContainer.textContent = "";

    // Show all btn
    const showAllContainer = document.getElementById("show-all-container");

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove("hidden");
    } else {
        showAllContainer.classList.add("hidden");
    }

    // show 12
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach((phone) => {
        // console.log(phone);
        // create a div
        const phoneCart = document.createElement("div");

        phoneCart.classList = `card bg-base-100 shadow-xl`;
        phoneCart.innerHTML = `
            <figure>
                <img class="mt-6" src="${phone.image}" alt="Phone" />
            </figure>

            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}');" class="btn btn-info text-white">Show Details</button>
                </div>
            </div>
        `;

        phoneContainer.appendChild(phoneCart);
    });

    // hide spinner
    loadingData(false);
};

// Handle serach
const handleSerch = (isShowAll) => {
    loadingData(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    // console.log(searchText);

    loadPhone(searchText, isShowAll);
};

// loading spinner
const loadingData = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");

    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
};

// Handle show all
const handleShowAll = () => {
    handleSerch(true);
};

// Handle show details
const handleShowDetails = async (id) => {
    // console.log(id);
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    // console.log(data);

    phone = data.data;
    showPhoneDetails(phone);
    console.log(phone);
};

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById("show_details_phone_name");
    phoneName.innerText = phone.name;

    console.log(phone);

    const showDetailContainer = document.getElementById(
        "phone-detail-container"
    );
    showDetailContainer.innerHTML = `
        <img class="my-4" src="${phone.image}" alt="phone"/>
        <p><span class="font-bold">Brand:</span> ${phone?.brand}</p>
        <p><span class="font-bold">Display:</span> ${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">GPS:</span> ${phone?.others?.GPS}</p>
        <p><span class="font-bold">Release Date:</span> ${phone?.releaseDate}</p>
    `;

    show_details_modal.showModal();
};

loadPhone();
