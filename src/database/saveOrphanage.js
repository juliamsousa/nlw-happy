function saveOrphanage (db, {lat, lng, name, about, whatsapp, images, instructions, opening_hours, open_on_weekends}) {
    
    db.run(`
        INSERT INTO orphanages (
            lat,
            lng,
            name,
            about,
            whatsapp,
            images,
            instructions,
            opening_hours,
            open_on_weekends
        ) VALUES (
            "${lat}",
            "${lng}",
            "${name}",
            "${about}",
            "${whatsapp}",
            "${images}",
            "${instructions}",
            "${opening_hours}",
            "${open_on_weekends}"
        );
    `);
}

module.exports = saveOrphanage;