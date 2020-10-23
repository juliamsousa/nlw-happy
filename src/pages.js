const dataBase = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');
module.exports = {

    // funcado de renderizacao da pagina inicial
    index(req, res) {
       // const city = require.query.city { city }
        return res.render('index')
    },

    // funcao de renderizacao de um orfanato
    async orphanage (req, res) {
        try {
            // pega o id que vem da requisicao
            const id = req.query.id;
            // espera a requisicao do db
            const db = await dataBase;
            // faz uma query ao db para pegar um orfanato pelo seu id
            const results = await db.all(`SELECT * FROM orphanages WHERE id="${id}"`)
            const orphanage = results[0];

            // pega as strings e divide a partir de cada ','
            orphanage.images = orphanage.images.split(",");
            orphanage.firstImage = orphanage.images[0];

            // verifica se é aberto ou fechado nos fins de semana
            // utilizar condicao ternaria para diminuir a funcao
            if(orphanage.open_on_weekends=="0")
                orphanage.open_on_weekends = false;
                    else
                        orphanage.open_on_weekends = true;
            
            // faz a renderizacao do orfanato buscado do banco de dados
            return res.render('orphanage',{orphanage})  
        }
            catch(error) {
                console.log(error)
                return res.send('Erro no banco de dados')
            }
    },

    // funcao de renderizacao dos orfanatos
    async orphanages (req, res) {
        try {
            // aguarda a requisicao do banco
            const db = await dataBase;
            // pega todos os orfanatos do bando de dados
            const orphanages = await db.all("SELECT * FROM orphanages")
            // renderiza os orfanatos
            return res.render('orphanages',{orphanages})
        }
            catch (error) {
                // tratamento de erro do banco de dados
                console.log(error)
                return res.send('Erro no banco de dados')
            }
    },

    createOrphanage (req, res) {
        return res.render('create-orphanage')
    },

    async saveOrphanage (req, res) {
        const fields = req.body;

        console.log("Latitude da req"+fields.latitude);
        console.log("Longitude da req"+fields.longitude);

        // confere se todos os campos foram preenchidos
        // verifica se algum campo possui valor vazio
        if(Object.values(fields).includes(''))
            return res.send('Todos os campos devem ser preenchidos')
        
        try {
            const db = await dataBase;
            await saveOrphanage(db, {
                lat: fields.latitude,
                lng: fields.longitude,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends
            })

            // após adicionar um orfanato redireciona para o mapa com os orfanatos
            return res.redirect('./orphanages')
        }
            catch (error) {
                console.log(error)
                return res.send('Erro no banco de dados')
            } 
    }
}