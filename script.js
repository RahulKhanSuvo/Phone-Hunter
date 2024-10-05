let allPhonesData = [];
const loadAllPhones = async (brandName = "iphone") => {
  document.getElementById("spinner").classList.remove("hidden");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${brandName}`
  );
  const data = await response.json();

  displayAllPhones(data.data);
  if (data.data.length > 6) {
    document.getElementById("show-all-btn").classList.remove("hidden");
  } else {
    document.getElementById("show-all-btn").classList.add("hidden");
  }
  document.getElementById("spinner").classList.add("hidden");
};
const displayAllPhones = (phones, status) => {
  allPhonesData = phones;
  let newPhones = [];
  console.log();
  if (!status) {
    newPhones = phones.slice(0, 6);
  } else {
    newPhones = phones;
  }

  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerHTML = "";
  if (phones.length === 0) {
    phonesContainer.innerHTML = `
    <h2>No data found</h2>
    `;
    return;
  }
  newPhones.forEach((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card border shadow-xl">
  <div class="p-10 mx-8 mt-8  rounded-lg  bg-[#0D6EFD0D]">
    <img 
      src=${phone.image}
      alt=${phone.phone_name}
      class="rounded-xl  mx-auto" />
  </div>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <div class="card-actions">
      <button onclick="showDetails('${phone.slug}')" class="btn  bg-[#0D6EFD] btn-primary">Details</button>
    </div>
  </div>
</div>
      `;
    phonesContainer.appendChild(div);
  });
};
const handelShowAll = () => {
  displayAllPhones(allPhonesData, true);
  document.getElementById("show-all-btn").classList.add("hidden");
};
// phone details
const showDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const { image, name, mainFeatures, brand, releaseDate, slug } = data.data;
  const { storage, displaySize, chipSet, sensors, memory } = mainFeatures;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
   <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <!-- Image Section -->
  <div class="flex justify-center mb-6">
    <img src=${image} alt="Iphone 13 Pro Max" class="w-[250px] rounded-lg">
  </div>
  
  <!-- Content Section -->
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-4">${name}</h1>
    <p class="text-gray-500 mb-4">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    </p>

    <!-- Product Information -->
    <div class="space-y-3 text-gray-700">
      <p><strong>Storage:</strong>${storage}</p>
      <p><strong>Display size:</strong>${displaySize}</p>
      <p><strong>Chipset:</strong>${chipSet}</p>
      <p><strong>Memory:</strong> ${memory}</p>
      <p><strong>Slug:</strong>${slug}</p>
      <p><strong>Release date:</strong>${releaseDate}</p>
      <p><strong>Brand:</strong>${brand}</p>
      <p><strong>GPS:</strong> AYes, with A-GPS, GLONASS, GALILEO, BDS, QZSS</p>
    </div>
  </div>
</div>

                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn btn-error">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
  `;
  my_modal_5.showModal();
};
const handelSearch = () => {
  document.getElementById("spinner").classList.remove("hidden");
  const searchText = document.getElementById("search-box").value;
  setTimeout(function () {
    loadAllPhones(searchText);
  }, 1000);
};
loadAllPhones();
