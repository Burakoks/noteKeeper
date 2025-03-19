// ! Ay Dizisi
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  // ! Html'den Javascript'e çekilen elemanlar
  const addBox = document.querySelector(".add-box");
  const popupBoxContainer = document.querySelector(".popup-box");
  const popupBox = document.querySelector(".popup");
  const closeBtn = document.querySelector("#close-btn");
  const form = document.querySelector("form");
  const wrapper = document.querySelector(".wrapper");
  let popupTitle = document.querySelector("header p");
  let submitBtn = document.querySelector("#submit-btn");
  
  // ! localstorage'dan note verilerini al.Eğer localstorage'da note yoksa bunun başlangıç değerini boş dizi olarak belirle
  
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  
  // ! Güncelleme işlemi için gereken değişkenler
  let isUpdate = false;
  let updateId = null;
  
  // Sayfanın yüklenme anını izle
  document.addEventListener("DOMContentLoaded", () => {
    // Sayfa yüklendiğinde notları render eden fonksiyonu çalıştır
    renderNotes(notes);
  });
  
  // * addBox elemanına tıklanınca popup'ı aç
  
  addBox.addEventListener("click", () => {
    //  popupBoxContainer &&  popupBox ı görünür kılmak için show classı ekle
    popupBoxContainer.classList.add("show");
    popupBox.classList.add("show");
  
    // Body'nin kaydırılmasını engelle
    document.querySelector("body").style.overflow = "hidden";
  });
  
  // * closeBtn'e tıklanınca popup'ı kapat
  closeBtn.addEventListener("click", () => {
    //  popupBoxContainer &&  popupBox ekrandan gizlemek için  show classını kaldır
    popupBoxContainer.classList.remove("show");
    popupBox.classList.remove("show");
  
    // Body'nin kaydırılmasını auto'ya çevir
    document.querySelector("body").style.overflow = "auto";
  
    // Eğer update işlemi yapılmaz ve popup kapatılırsa popup'ı eski haline çevir
    isUpdate = false;
    updateId = null;
    popupTitle.textContent = "New Note";
    submitBtn.textContent = "Add Note";
  
    // Formu resetle
    form.reset();
  });
  
  // * formun gönderilmesini izle
  form.addEventListener("submit", (e) => {
    //  form'un sayfa yenilmesini engelle
    e.preventDefault();
  
    // Form içerisindeki input ve textarea'ya eriş
    const titleInput = e.target[0];
    const descriptionInput = e.target[1];
  
    //  input ve textarea nın değerlerine eriş ve başında-sonunda boşluk varsa bunu kaldır
    let title = titleInput.value.trim();
    let description = descriptionInput.value.trim();
  
    // Eğer inputlar boş bırakılmışsa uyarı ver
  
    if (!title && !description) {
      alert("Lütfen formdaki gerekli kısımları doldurunuz !");
  
      return; // Burada return kullanımı ile if bloğu çalıştıktan sonras kodun devam etmesini engelledik
    }
  
    // Tarih verisini oluştur
    const date = new Date();
  
    // Gün,ay,yıl ve id değerleri oluştur
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const id = date.getTime();
  
    if (isUpdate) {
      // Güncelleme yapılmak istenen notu notes dizisi içerisinden bul
      const findIndex = notes.findIndex((note) => note.id == updateId);
  
      // Index'i bilinen elemanı dizi elemanını güncelle
  
      notes[findIndex] = {
        title,
        description,
        id,
        date: `${month} ${day},${year}`,
      };
  
      // Güncelleme modunu kapat ve popup içerisindeki elemanları eskiye çevir
      isUpdate = false;
      updateId = null;
      popupTitle.textContent = "New Note";
      submitBtn.textContent = "Add Note";
    } else {
      // Not verisini yönetmek için bir obje oluştur.
  
      let noteInfo = {
        id,
        title,
        description,
        date: `${month} ${day},${year}`,
      };
  
      // noteInfo'yu note dizisine ekle note
      notes.push(noteInfo);
    }
  
    // LocalStorage'a not dizisini ekle
    localStorage.setItem("notes", JSON.stringify(notes));
  
    // Formu resetle
    form.reset();
  
    //  popupBoxContainer &&  popupBox ekrandan gizlemek için  show classını kaldır
    popupBoxContainer.classList.remove("show");
    popupBox.classList.remove("show");
  
    // Body'nin kaydırılmasını auto'ya çevir
    document.querySelector("body").style.overflow = "auto";
  
    // Notları render et
    renderNotes(notes);
  });
  
  // Notları arayüze render edecek fonksiyon
  
  function renderNotes(notes) {
    // ! Mevcut notları kaldır
    document.querySelectorAll(".note").forEach((li) => li.remove());
  
    // Note dizisindeki herbir elemanı dön
    notes.forEach((note) => {
      // Note dizisindeki herbir eleman için birer note kartı oluştur
      // Note elemanını ayırt edebilmemiz için bu elemana bir id ata.Bir elemana id atamak için bunu data özelliği olarak atarız.
      let noteEleman = `<li class="note" data-id='${note.id}'>
    
          <!-- Note Details -->
          <div class="details">
            <!-- Title && Description -->
            <p class="title">${note.title}</p>
            <p class="description">${note.description}</p>
          </div>
          <!-- Bottom -->
          <div class="bottom">
            <span>${note.date}</span>
            <div class="settings">
              <!-- Icon -->
              <i class="bx bx-dots-horizontal-rounded"></i>
              <!-- Menu -->
              <ul class="menu">
                <li class='editIcon'><i class="bx bx-edit"></i> Düzenle</li>
                <li class='deleteIcon'><i class="bx bx-trash-alt"></i> Sil</li>
              </ul>
            </div>
          </div>
        </li>`;
  
      // insertAdjacentHTML metodu bir elemanı bir html elemanına göre yerleştirmek için  kullanılır.Bu metot hangi konuma ekleme yapılacağı ve hangi elemanın ekleneceğini belirtmemizi ister.
      addBox.insertAdjacentHTML("afterend", noteEleman);
    });
  }
  
  // Menu kısmının görünürlüğünü ayarlayan fonksiyon
  
  function showMenu(eleman) {
    // ! parentElement ==> Bir elemanın kapsayıcısına erişmek için kullanılır
  
    // Dışarıdan gelene elemanın kapsayıcına show classı ekle
    eleman.parentElement.classList.add("show");
  
    // Eklenen show classını üç nokta haricinde bir yere tıklanırsa kaldır
    document.addEventListener("click", (e) => {
      // Tıklanılan eleman üç nokta (i etiketi) değilse yada kapsam dışarısına tıklandıysa
      if (e.target.tagName != "I" || e.target != eleman) {
        // Kapsam dışarısına tıklandıysa show classını kaldır
        eleman.parentElement.classList.remove("show");
      }
    });
  }
  
  // * Wrapper kısmındaki tıklanmaları izle
  
  wrapper.addEventListener("click", (e) => {
    // Eğer üç noktaya tıklandıysa
    if (e.target.classList.contains("bx-dots-horizontal-rounded")) {
      // Show Menu fonksiyonunu çalıştır
      showMenu(e.target);
    }
    // Eğer sil butonuna  tıklandıysa
    else if (e.target.classList.contains("deleteIcon")) {
      // Kullanıcıdan silme işlemi için onay al
      const res = confirm("Bu notu silmek istediğinize eminmisiniz ?");
  
      // Eğer kullanıcı silme işlemini kabul ettiyse
      if (res) {
        // parentElement ile bir elemanın kapsam elemanına eriştik.Ama kapsam eleman sayısını arttıkça bunu yapmamız bir hayli zorlaşır.Bunun yerine closest metodunu kullanırız.Bu metot belirtilen class yada id'ye göre en yakın elemana erişmek için kullanılır.
  
        // Tıklanılan elemanın kapsayıcısı olan note kartına eriş
        const note = e.target.closest(".note");
  
        // Erişilen note kartının id'sine eriş
        const notedId = parseInt(note.dataset.id);
  
        // Id'si bilinen note'u note dizisinden kaldır
        notes = notes.filter((note) => note.id != notedId);
  
        // LocalStorage'ı güncelle
        localStorage.setItem("notes", JSON.stringify(notes));
  
        // Notların render et
        renderNotes(notes);
      }
    }
    // Eğer düzenle butonuna  tıklandıysa
    else if (e.target.classList.contains("editIcon")) {
      // Tıklanılan editIcon butonun kapsayıcısı olan note elemanına eriş
      const note = e.target.closest(".note");
      // Erişilen notun id'sine eriş
      const noteId = parseInt(note.dataset.id);
      // Erişilen notu notes dizisi içerisinde bul
      const foundedNote = notes.find((note) => note.id == noteId);
  
      // Popup'ı güncelleme moduna sok
      isUpdate = true;
      updateId = noteId;
  
      // Popup'ı görünür kıl
      popupBoxContainer.classList.add("show");
      popupBox.classList.add("show");
  
      // Popup içerisindeki input ve textarea'ya notun title ve description değerlerini ata
      form[0].value = foundedNote.title;
      form[1].value = foundedNote.description;
  
      // Popup içerisindeki title ve add buttonın içeriğini update moduna göre düzenle
      popupTitle.textContent = "Update Note";
      submitBtn.textContent = "Update";
    }
  });