class Player {

    constructor(level, exp, maxhp, hp, pow, def, spd) {
        this.level = level;
        this.exp = exp;
        this.maxhp = maxhp;
        this.hp = hp;
        this.pow = pow;
        this.def = def;
        this.spd = spd;
    }
    setLevel(level){
        this.level = level;
    }
    getLevel(){
    	return this.level;
    }
    setExp(exp){
        this.exp = exp;
    }
    getExp(){
        return this.exp;
    }
    setMaxHp(maxhp){
        this.maxhp = maxhp;
    }
    getMaxHp(){
        return this.maxhp;
    }
    setHp(hp){
        this.hp = hp;
    }
    getHp(){
        return this.hp;
    }
    setPow(pow){
        this.pow = pow;
    }
    getPow(){
        return this.pow;
    } 
    setDef(def){
        this.def = def;
    }
    getDef(){
        return this.def;
    } 
    setSpd(spd){
        this.spd = spd;
    }
    getSpd(){
        return this.spd;
    } 
}
 