const dataBase = require ('./db');
const saveOrphanage = require ('./saveOrphanage')

const object1 = {
        lat: "-54.1570127",
        lng: "-37.534041",
        name: "Lar da Srta. Peregrine para crianças Peculiares",
        about: "Presta assistência a crianças de 05 a 15 anos que se encontram em situação de risco e/ou vulnerabilidade social.",
        whatsapp: "987654321",
        images: [
            "/images/lar-peregrine.jpeg",
            "/images/lar-peregrine.jpeg"
            // "/images/peregrine-1.jpg",
            // "/images/lar-peregrine.jpeg",
            // "/images/peregrine-2.jpg",
            // "/images/lar-peregrine.jpeg",
            // "/images/peregrine-4.jpg"
        ].toString(),
        instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
        opening_hours: "Horário de visitas das 8h até 18h.",
        open_on_weekends: "1"
}

const object2 = {
        lat: "-54.1570127",
        lng: "-37.338041",
        name: "Mansão Foster para amigos imaginários",
        about: "Presta assistência para amigos imaginários de crianças que cresceram.",
        whatsapp: "213456789",
        images: [
            "/images/lar-peregrine.jpeg",
            "/images/lar-peregrine.jpeg"
        //     "/images/peregrine-1.jpg",
        //     "/images/lar-peregrine.jpeg",
        //     "/images/peregrine-2.jpg",
        //     "/images/lar-peregrine.jpeg",
        //     "/images/peregrine-4.jpg"
        ].toString(),
        instructions: "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
        opening_hours: "Horário de visitas das 8h até 18h.",
        open_on_weekends: "0"
}

dataBase.then(async db => {
    // seleciona todos os dados que possuem o id 1
    // const orphanage = await db.all('SELECT * FROM orphanages WHERE id="1"')
    // console.log(orphanage);

    // // apaga dados da tabela
    // // sem o where deleta todos os dados da tabela
    // await db.run("DELETE FROM orphanages WHERE id='3'")

    // // salva os dados do objeto no db
    await saveOrphanage(db, object1)
    await saveOrphanage(db, object2)

    // // seleciona todos os dados do db
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages);
})

