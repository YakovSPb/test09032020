class LocalStorageUtil {
	constructor() {
		this.keyName = 'products'
	}

	getProducts() {
		const productsLocalStorage = localStorage.getItem(this.keyName)
		if(productsLocalStorage !== null) {
			return JSON.parse(productsLocalStorage)
		}
		return []
	}

	putProducts(id, counter) {
		let products = this.getProducts()
		const index = products.indexOf(id)
		let match = false

		products.forEach( e => {

			if(id.id == e.id) {
				e.counter++
				products.push(id)
				match = true
			}
		})

		if(!match){
			products.push(id)
		id.counter++
		} else{
			products.splice(index, 1)
		}

		localStorage.setItem(this.keyName, JSON.stringify(products))
		renderProducts()
		return {products}
	}
}

const localStorageUtil = new LocalStorageUtil

