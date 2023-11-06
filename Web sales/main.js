// hiển thị menu món ăn
var foodContainer = document.getElementById('food-container');
var loadMoreBtn = document.getElementById('load-more-btn');
var hideBtn = document.getElementById('hide-btn');
var startIndex = 0; //Biến để lưu chỉ số bắt đầu lấy danh sách món ăn từ API.
var endIndex = 8;// Biến để lưu chỉ số kết thúc lấy danh sách món ăn từ API.
// Hàm gọi API để lấy danh sách món ăn
function getFoods() {
  fetch('https://649436760da866a953675acb.mockapi.io/menufood')
    .then(response => response.json())
    .then(data => {
      // Kiểm tra nếu còn món ăn để hiển thị
      if (data.length > endIndex) {
        loadMoreBtn.style.display = 'block';
      }

      // Hiển thị danh sách món ăn
      for (var i = startIndex; i < endIndex; i++) {
        var food = data[i];
        // Tạo phần tử li để chứa thông tin món ăn
        var foodItem = document.createElement('li');
        foodItem.classList.add('card');
        // Thiết lập nội dung HTML cho phần tử li
        foodItem.innerHTML = `
            <img src='${food.image}' class="card-img-top" style='height:200px'>
            <div class="card-body">
                <div class='row'>
                    <h5 class="card-title float-start" style='width:70%'>${food.foodName}</h5>
                    <p class='float-end' style='width:30%'>${food.price}$</p>
                </div>
                <p class="card-text">There are many things are needed to start the Fast Food Business.</p>
                <button href="#" class="btn btn-web float-start" id='btn-add' onclick='addToCart(this)' style="width:40px">+</button>
                <div class="my-2 star-rating float-end" style="--rating: ${food.star};"></div>
            </div>
        `;
         // Thêm phần tử li vào foodContainer
        foodContainer.appendChild(foodItem);
      }

      // Tăng chỉ số để lấy thêm món ăn tiếp theo
      startIndex = endIndex;
      endIndex += 8;
    })
    .catch(error => console.error(error));
}
// Hàm gọi khi nhấn nút "Xem thêm"
function loadMore() {
  getFoods();
  loadMoreBtn.style.display = 'none';
  hideBtn.style.display = 'block';
}

// Hàm gọi khi nhấn nút "Ẩn"
function hideItems() {
  startIndex = 0;
  endIndex = 8;
  foodContainer.innerHTML = '';
  getFoods();
  hideBtn.style.display = 'none';
}

// Gọi hàm để hiển thị món ăn ban đầu
getFoods();

// hiển thị người review
const reviewContainer = document.getElementById('review-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
let id=1;//Biến để lưu ID của đánh giá hiện tại (ban đầu là 1).
function getReview() {
    fetch(`https://649436760da866a953675acb.mockapi.io/review/${id}`)
    .then(response => response.json())
    .then(data => {
        let {name,avatar,job,star}=data;
        // Thiết lập nội dung HTML 
        reviewContainer.innerHTML=`
            <img src="${avatar}" class="rounded-circle my-4">
            <p class="w-75 my-3" style="margin:0 auto;">You need not only Just Food Stalls with Persons but also specialized equipment, Skills to manage Customers, Effective Product catlogues etc very successful to make your.</p>
            <div class="my-2 star-rating" style="--rating: ${star}; margin:0 auto;"></div>
            <h3>${name}</h3>
            <p>${job}</p>
        `
    })
}
// Hàm gọi khi nhấn nút "tiếp theo"
nextButton.addEventListener('click',()=>{
    id++;
    if (id>10) {
        id=1;
    }
    getReview();
})
// Hàm gọi khi nhấn nút "quay lại"
prevButton.addEventListener('click',()=>{
    id--;
    if (id<1) {
        id=10;
    }
    getReview()
})

getReview()

// thêm món ăn vào giỏ hàng
let cart = []; // tạo mảng để lưu món ăn khi click nút thêm
function addToCart(x) {
  let food = x.parentElement.parentElement; // biến food để lấy các thông tin của món ăn khi click nút thêm
  let nameFood = food.querySelector('.card-title').innerText; // lấy tên món ăn
  let priceFood = food.querySelector('.float-end').innerText; // lấy giá của món ăn
  let imageElement = food.querySelector('img');// lấy thẻ chứa hình ảnh
  let src = imageElement.getAttribute('src');// lấy src cảu thẻ hình ảnh
  let quantity= 1;// đặt số lượn là 1 khi thêm món ăn lần đầu
  let foodInfo = [nameFood, priceFood, src,quantity]; // tạo mảng để chứa thông tin của món ăn vừa lấy
  // Kiểm tra xem món ăn đã tồn tại trong giỏ hàng hay chưa
  let existingFood = cart.find(item => item[0] === nameFood);
  if (existingFood) {
    // Nếu món ăn đã tồn tại, cập nhật số lượng
    existingFood[3]+=1; //số lượng được lưu ở vị trí thứ 3 trong mảng foodInfo
  } else {
    // Nếu món ăn chưa tồn tại, thêm món ăn mới vào giỏ hàng
    let foodInfo = [nameFood, priceFood, src, quantity]; // Thêm số lượng 1 vào mảng foodInfo
    cart.push(foodInfo);
  }
}
// hàm hiển thị món ăn trong giỏ hàng
function showMyCart() {
  let cartInfo = '';
  let totalAmount=0;//khai báo biến tổng tiền
  // duyệt các món ăn trong mảng cart để hiển thị
  for (let i = 0; i < cart.length; i++) {
    let price= parseFloat(cart[i][1].substring(0,4))// lấy đơn giá món ăn từ cart
    let quantity=cart[i][3];//lấy số lượng của món ăn
    let totalFood= price*quantity;//tính tổng tiền của món ăn hiện tại
    totalAmount+=totalFood;//cộng tiền món ăn hiện tại vào tổng tiền
    // thiết lập nội dung HTML
    cartInfo += `<tr style="height: 70px;border-bottom: 1px solid #333;">
                    <td>${i + 1}</td>
                    <td><img src="${cart[i][2]}" style="height: 50px; width:50px"></td>
                    <td>${cart[i][0]}</td>
                    <td>${cart[i][1]}</td>
                    <td>${cart[i][3]}</td>
                    <td>${totalFood}$</td>
                    <td><button class="btn btn-danger" onclick="removeFromCart(${i})">Remove</button></td> <!-- Nút xóa -->
                </tr>`;           
  }
  document.getElementById('mycart').innerHTML = cartInfo; // hiển thị món ăn trong nơi chứa của giỏ hàng
  document.getElementById('totalAmount').innerText = totalAmount.toFixed(2)+"$";// hiển thị tổng tiền

}

function removeFromCart(index) {
  cart.splice(index, 1); // Xóa món ăn khỏi giỏ hàng dựa trên chỉ mục
  showMyCart(); // Hiển thị lại giỏ hàng sau khi xóa
}