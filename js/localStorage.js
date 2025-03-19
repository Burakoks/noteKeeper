// Localstorage (Lokal Depo)

// Localstorage bizim için tarayıcıda veri tutan bir depodur.Bu alanda küçük çaplı verilerimizi tutarız.Bu alan bizim için key-value değer çiftleri halinde değerler tutar.Ve verileri yalnızca string veri formatında kabul eder.

// Localstorage'a eleman ekleme

// Localstorage'a eleman eklemek için  localStorage.setItem metodu kullanılır.Bu metod bizden bir key değeri ve bu keyin değer karşılığı olacak datayı vermemizi ister.Hem key hemde data string veri formatında olmalıdır.

const users = ["Altan", "Didem", "Ali", "Işıl"];

localStorage.setItem("users", JSON.stringify(users));

// Localstorage'dan eleman alma

// Localstorage'a eleman eklemek için  localStorage.getItem metodu kullanılır.

console.log(JSON.parse(localStorage.getItem("users")));

// ! Localstorage'a eleman ekler ve localStorage'dan eleman alırken veri dönüşümü yapmayı unutmamalıyız [JSON.stringify && JSON.parse]