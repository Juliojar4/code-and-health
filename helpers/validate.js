
module.exports = class Validate {
    static validate(req, model) {
        if (typeof model !== 'object') {
            console.log('Estou no validat')
            return false
        }

        console.log('Passei do validate')
        let obj = model.schema.obj;

        obj.map((key, value) =>  {      
            if (!req.body[key]) {
                console.log(value);
                obj[key]['error'] = true;
                obj[key]['msg'] = `o campo ${key} `
                return
            }
            if (typeof (req.body[key] != typeof (value))) {
                console.log('Tipo errado')
                obj[key]['error'] = true;
                obj[key]['msg'] = `o campo ${key} esta incorreto `
            }
        return obj;
        })
    }
}