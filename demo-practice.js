function person(name){
    this.name = name;
    this.great= function(){
        console.log("im"+this.name);
    }
}

const per1 = new person("alice");
const per2 =new person("krish");

per1.great();
per2.great();