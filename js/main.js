// ROOT
const ROOT_PRODUCTS = document.getElementById('products')
const ROOT_HEADER = document.getElementById('header')
const ROOT_SHOPPING = document.getElementById('shopping')



// SELECT
function selectSorting(){
	let selectValue = document.getElementById('selectSorting').value
	if(selectValue == 1){
		CATALOG.sort(function(a, b) {
			let textA = a.title.toUpperCase()
			let textB = b.title.toUpperCase()
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
		})
		renderCatalog()
		renderProducts()
	} 
	 if(selectValue == 2) {
		CATALOG.sort(function(a, b) {
			return a.price - b.price
		})
		renderCatalog()
		renderProducts()
	} 
	if (selectValue == 3) {
		CATALOG.sort(function(a, b) {
			return a.available - b.available
		})
		renderCatalog()
		renderProducts()
	} 

}



// HEADER
function renderCatalog(){
	const productsStore = localStorageUtil.getProducts()
	let htmlCatalog = ``

	let sum = 0

	productsStore.forEach(({id, counter, title, image, descr, price, available,}) => {


		CATALOG.forEach( e => {
			if(id == e.id){
				title = e.title
				image = e.image
				descr = e.descr
				price = e.price
				let sumItem = price * counter
				sum +=sumItem
			}
		})

		htmlCatalog += `
		<li data-id="${id}" class="header-element">
		<img class="header-element__image" src="${image}" alt="alt" />
		<span class="header-element__name">${title}</span>
		<span class="header-element__quantity">x${counter}</span>
		<span class="header-element__close">&#10006;</span>
		</li>
		`



	})


	const html = `
	<div class="header-container">
	<div class="header-items">
	<ul class="header-list">
	${htmlCatalog}
	</ul>
	</div>
	<div class="header-sum">
	<span>итог</span>
	<div class="header-howmach">${sum.toLocaleString()} рублей</div>
	<div class="header-button" onclick="alert('Мы вам позвоим!')">Заказать</div>
	</div>
	</div>
	`


	ROOT_HEADER.innerHTML = html

	function closeItem(){
		let close = document.getElementsByClassName('header-element__close')
		const productsStore = localStorageUtil.getProducts()

		for (var i = 0; i< close.length; i++) {
			close[i].addEventListener('click', function(event) {
				let elementId = event.target.parentNode.getAttribute('data-id')
				productsStore.forEach(({id}, index) => {
					if(elementId == id){
						let array = JSON.parse(localStorage.getItem('products'))
						array.splice(index, 1)
						localStorage.setItem('products', JSON.stringify(array))
						renderCatalog()
						renderProducts()
					}

				})

			})
		}	
	}
	closeItem()
}

renderCatalog()

// PRODUCTS
function handleSetLocationStorage(element, id, counter) {
	const {products} = localStorageUtil.putProducts({'id': id, 'counter': counter})
}




function renderProducts(){

	const productsStore = localStorageUtil.getProducts()



	let htmlCatalog = ``


	let items = document.querySelectorAll('#pagination li')
	let notesOnPage = 3

	for(let item of items){
		item.addEventListener('click', function(){
			let pageNum = +this.innerHTML


			let start = (pageNum - 1) * notesOnPage
			let end = start + notesOnPage
			let catalogSplice = CATALOG.slice(start, end)

			for(let item of catalogSplice){

			}


		})
	}




	CATALOG.forEach(({id, title, image, descr, price, available, counter = 0}) => {
		const availableString =	available ? 'Есть в наличии' : 'Нет в наличии'



		productsStore.forEach( e => {
			if(id == e.id) {
				counter = e.counter
			}
		})

		function showCounter(){
			if (counter>0){
				return `<span class="products-element__quantity">Добавлено: <span class="products-element__quantity-span">${counter} товаров</span</span>`
			} else{
				return `<span class="products-element__quantity"></span>`
			}
		}

		let newCounter = showCounter()


		htmlCatalog += `
		<li class="products-element">
		<img class="products-element__image" src="${image}" alt="alt" />
		<div class="products-element__info">
		<span class="products-element__name">${title}</span>
		<span class="products-element__price">${price.toLocaleString()} рублей</span>
		<span class="products-element__descr">${descr}</span>
		</div>
		<div class="products-element__but-wrap">
		<div class="products-element__btn" onclick="handleSetLocationStorage(this, '${id}', '${counter}')">
		Добавить в корзину
		</div>
		${newCounter}
		</div>
		</li>
		`
	})

	const html =  `
	<ul id="products-container">
	${htmlCatalog}
	</ul>
	`


	ROOT_PRODUCTS.innerHTML = html
	renderCatalog()
}
renderProducts()

