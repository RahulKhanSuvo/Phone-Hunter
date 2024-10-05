const loadAllPhones = async () => {
  document.getElementById("spinner").classList.remove("hidden");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=iphone`
  );
  const data = await response.json();
  displayAllPhones(data.data);
  document.getElementById("spinner").classList.add("hidden");
};
const displayAllPhones = (phones) => {
  const phonesContainer = document.getElementById("phone-container");
  phones.forEach((phone) => {
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
      <button class="btn btn-primary">Details</button>
    </div>
  </div>
</div>
      `;
    phonesContainer.appendChild(div);
  });
};
const handelSearch = () => {
  document.getElementById("spinner").classList.remove("hidden");
  setTimeout(function () {
    loadAllPhones();
  }, 1000);
};
loadAllPhones();
