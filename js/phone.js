// Brands: iphone, samgsung, oppo, huawei
const loadPhone = async (searchName = "iphone", isShowAll) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchName}`
    );
    const data = await res.json();
    const phone = data.data;

    displayPhone(phone, isShowAll);
};

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
        console.log(phone);
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
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
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

    console.log(searchText);

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

loadPhone();
