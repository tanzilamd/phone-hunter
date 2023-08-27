// Brands: iphone, samgsung, oppo
const loadPhone = async (searchName = "iphone") => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchName}`
    );
    const data = await res.json();
    const phone = data.data;

    displayPhone(phone);
};

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById("phone-container");

    // clear container for search
    phoneContainer.textContent = "";

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
};

// Handle serach
const handleSerch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    console.log(searchText);

    loadPhone(searchText);
};

loadPhone();
