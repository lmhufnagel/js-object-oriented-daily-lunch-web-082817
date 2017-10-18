let customerId = 1
const store = {customers: [], deliveries: [], meals: [], employers: []}

class Customer {
  constructor(name, employer){
    this.name = name
    if(employer) {
      this.employerId = employer.id
    }
    this.id = customerId++
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id
    }.bind(this))

  }

  meals() {
    return this.deliveries().map(
      function(delivery) {
        return delivery.meal()
      }
    )
  }

  totalSpent() {
    return this.meals().reduce(function(acc, meal) {
      acc += meal.price
      return acc
    }, 0)
  }
}

let mealId = 1
class Meal {
    constructor(title, price){
      this.title = title
      this.price = price
      this.id = mealId++
      store.meals.push(this)
    }

    deliveries() {
      return store.deliveries.filter(function(delivery) {
        return delivery.mealId === this.id
      }.bind(this))
    }

    customers() {
      return this.deliveries().map(function(delivery) {
        return delivery.customer()
      })
    }
    static byPrice(){
      return store.meals.sort(function(meal1, meal2) {
        return meal2.price - meal1.price
      })
    }
}

let deliveryId = 1
class Delivery {
    constructor(meal, customer){
      if (meal) {
        this.mealId = meal.id
      }
      if (customer) {
        this.customerId = customer.id
      }
      this.id = deliveryId++
      store.deliveries.push(this)
    }

    meal() {
      return store.meals.find(function(meal) {
        return this.mealId === meal.id
      }.bind(this))
    }
    customer() {
      return store.customers.find(function(customer) {
        return this.customerId === customer.id
      }.bind(this))
    }
}

let employerId = 1

class Employer {
  constructor(name){
    this.name = name
    this.id = employerId++
    store.employers.push(this)
  }
  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id
    }.bind(this))
  }
  deliveries() {
    return this.employees().reduce(function(acc, em, i, arr) {
      acc = acc.concat(em.deliveries())
      return acc
    }, [])
  }
  meals() {
    return this.employees().reduce(function(acc, em, i, arr) {
      for(let i = 0; i<em.meals.length; i++) {
        if( acc.includes(em.meals[i]) ) {
          acc.push(em.meals[i]);
        }
      }
      return acc
    }.bind(this), [])
  }


  mealTotals() {
    const mealTotal = {}

debugger

    this.meals().forEach(function(meal){
      this.mealTotal[meal.id] = 0
    }.bind(this))

    const allTheMeals = this.employees().reduce(function(acc, em, i, arr) {
      acc = acc.concat(em.meals());
      return acc
    }, [])

    allTheMeals.forEach(function(meal) {

      for(const key in this.mealTotal) {
        if (meal.id === key) {
          this.mealTotal[key]++
        }
      }
    }.bind(this))
    return mealTotal
  }
}
