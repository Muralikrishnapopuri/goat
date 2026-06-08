function funnew(greeting){


    console.log(greeting+"+"+this.name)
}
const person = {
    name:"me"
}
funnew.call(person,"hello")

