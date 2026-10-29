const CONFIG = {
    titulo: "Todo a la Parrilla",
    autoras: "Carolina Carriel  /  Isidora Díaz",
    precio: "$14.99 USD",
    payhipUrl: "https://payhip.com/b/1HPcz",
    instagramUrl: "https://www.instagram.com/todoalaparrillalibro/",
    youtubeUrl: "https://www.youtube.com/@todoalaparrilla8251",
    fotoAutorasUrl: "",
    // Sección "Autoras" (se abre con el botón "Saber más" o desde el menú)
    autora1: {
        nombre: "Carolina Carriel",
        cv: "Cocinera autodidacta e Ingeniera en biotecnología molecular de la Universidad de Chile. Sus abuelas Tita y Elsa le enseñaron desde niña a apreciar los platos humildes de antes y los secretos de la sazón de la cocina chilena tradicional. Así, en paralelo a su formación profesional como científica, transformó su amor por la cocina en acciones concretas. Desde 2010 forma parte de Slow Food Internacional, y al igual que Isidora es miembro fundadora de la comunidad Pilgua SCL en Santiago, asumiendo como líder en dos periodos.\nHoy es Directora de Relaciones Internacionales de Slow Food Chile.\nEn su paso por Nueva Zelanda (2015-2017) cocinó en diversos restaurantes y conoció la revitalización de la cocina maorí. Durante su reciente estadía en Brasil volvió al quehacer científico, a la vez que aprendió sobre cocina brasileña y conoció muy de cerca la parrilla local, trabajando en eventos con mujeres parrilleras brasileñas. Hoy de vuelta en Chile, Carolina se mueve entre la ciencia y la cocina, experimentando con fuegos y fermentados.",
        fotoUrl: "",
        instagramUrl: "https://www.instagram.com/caro_car"
    },
    autora2: {
        nombre: "Isidora Díaz",
        cv: "Cocinera autodidacta y cronista gastronómica. A los diez años ya ayudaba a su papá en los asados familiares, a la vez que aprendía sobre sánguches en el Millahue, el exitoso restaurante de su mamá en el Arauco noventero.\nDe profesión Profesora de Filosofía de la Universidad de Chile, también ha dictado clases sobre cultura gastronómica y cocina chilena y sudamericana en escuelas de cocina en Santiago, Estados Unidos y recientemente en Dinamarca. También ha trabajado como periodista gastronómica, colaborando con medios en Chile y el extranjero, desde 2011 hasta la fecha.\nEn 2011 fue elegida como uno de los 100 jóvenes líderes por el diario El Mercurio.\nEs miembro de Slow Food Internacional desde 2010 y miembro fundadora de la comunidad Pilgua SCL en Santiago. Desde 2017 reside en Copenhagen, donde trabaja como instructora culinaria en Meyers Madhus y cursa el Máster en Estudios Alimentarios Integrados en la Universidad de Copenhagen.",
        fotoUrl: "",
        instagramUrl: "https://www.instagram.com/isidoradiaz/"
    }
};

const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
};

const setHref = (id, value) => {
    const element = document.getElementById(id);
    if (element && value) element.href = value;
};

document.addEventListener("DOMContentLoaded", () => {
    setText("bookTitle", CONFIG.titulo);
    setText("authorName", CONFIG.autoras);
    setText("bookPrice", CONFIG.precio);
    setHref("buyHeroBtn", CONFIG.payhipUrl);
    setHref("buyNavBtn", CONFIG.payhipUrl);
    setHref("igLink", CONFIG.instagramUrl);
    setHref("ytLink", CONFIG.youtubeUrl);

    if (CONFIG.fotoAutorasUrl) {
        const box = document.getElementById("authorsPhoto");
        if (box) {
            box.classList.add("has-photo");
            box.innerHTML = "";
            const img = document.createElement("img");
            img.src = CONFIG.fotoAutorasUrl;
            img.alt = "Fotografía de " + CONFIG.autoras;
            box.appendChild(img);
        }
    }

    [CONFIG.autora1, CONFIG.autora2].forEach((a, i) => {
        const n = i + 1;
        setText("author" + n + "Name", a.nombre);
        setText("author" + n + "Cv", a.cv);
        setHref("author" + n + "Ig", a.instagramUrl);
        if (a.fotoUrl) {
            const box = document.getElementById("author" + n + "Photo");
            if (box) {
                box.classList.add("has-photo");
                box.innerHTML = "";
                const img = document.createElement("img");
                img.src = a.fotoUrl;
                img.alt = "Fotografía de " + a.nombre;
                box.appendChild(img);
            }
        }
    });

    const authorsSection = document.getElementById("perfil-autoras");
    const moreBtn = document.getElementById("moreAuthorsBtn");
    const navAuthors = document.getElementById("authorsNavBtn");
    const closeAuthors = document.getElementById("closeAuthorsBtn");
    const openAuthors = event => {
        if (event) event.preventDefault();
        authorsSection.hidden = false;
        if (moreBtn) moreBtn.setAttribute("aria-expanded", "true");
        if (navAuthors) navAuthors.classList.add("active");
        authorsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const hideAuthors = () => {
        authorsSection.hidden = true;
        if (moreBtn) moreBtn.setAttribute("aria-expanded", "false");
        if (navAuthors) navAuthors.classList.remove("active");
        const base = document.getElementById("autoras");
        if (base) base.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    if (authorsSection) {
        if (moreBtn) moreBtn.addEventListener("click", openAuthors);
        if (navAuthors) navAuthors.addEventListener("click", openAuthors);
        if (closeAuthors) closeAuthors.addEventListener("click", hideAuthors);
    }

    const menuBtn = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("navLinks");
    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(open));
            menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
            menuBtn.textContent = open ? "×" : "☰";
        });

        nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Abrir menú");
            menuBtn.textContent = "☰";
        }));
    }
});
function showRecipe(index) {
    const tabs = document.querySelectorAll(".recipe-tab");
    const cards = document.querySelectorAll(".recipe-card");
    tabs.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
        tab.setAttribute("aria-selected", String(i === index));
    });
    cards.forEach((card, i) => card.classList.toggle("active", i === index));
}
const RECETAS = {
    "peras-asadas": {
        titulo: "Peras asadas en salsa de vino blanco, con queso de cabra y granada",
        intro: [
            "Aquí se mezclan sabores y texturas muy interesantes: el queso va derritiéndose suavemente sobre las peras, mientras que las semillas de granada explotan en la boca, agregando frescor a este postre otoñal. También puedes hacer este postre con un vino rosé o con una cerveza dulzona."
        ],
        pasos: [
            "Pon sobre la parrilla el sartén con el vino. Agrega el azúcar, revolviendo para que se disuelva. Cuenta unos 10 a 12 minutos desde que la mezcla comience a burbujear, hasta que tome la consistencia de un almíbar ligero.",
            "Al mismo tiempo que lo anterior, pon las peras en la parrilla con el lado de la carne hacia el fuego. Tras 8 a 10 minutos o cuando estén bien doradas, dalas vuelta y déjalas un par de minutos por el lado de la cáscara.",
            "Pon la peras asadas y la mantequilla en el sartén y mezcla bien con el almíbar de vino, hasta que la mantequilla se derrita y las peras queden completamente bañadas con la salsa. Deja el sartén en la parrilla durante 2 minutos más, agitando suavemente de vez en cuando. Si la salsa se pusiera demasiado espesa, agrega una o dos cucharadas de agua.",
            "Retira el sartén del fuego y deja entibiar un poco.",
            "Agrega el queso y las semillas de granada directamente sobre el sartén y sirve.",
            "También puedes distribuir las peras y su salsa en cuencos individuales, agregando el queso y las semillas de granada junto antes de servir."
        ],
        consejo: { titulo: "Hazlo antes", texto: "Puedes dejar la granada desgranada y el queso trozado o en lascas con hasta 3 horas de anticipación, ambos en recipientes herméticos en el refrigerador." }
    },
    "sanguche-arrollado": {
        titulo: "Sánguche de arrollado asado con pebre y mayonesa casera",
        intro: [
            "El arrollado es una preparación chilena de la que ya se tiene registro en la época portaliana, de acuerdo a lo que nos cuenta Eugenio Pereira Salas en sus Apuntes de la Cocina Chilena: “Una suculenta pulpa de chancho cortada en tiras y bien aliñada con ají, ajo, orégano, comino, vinagre y pimienta que se enrolla en cuero de chancho, se amarra bien amarrado hasta el día siguiente, luego se pone a cocer en una olla con media cebolla y se enfría en el mismo caldo”. Te invitamos a honrar la tradición con este magnífico sánguche. Si no vives en Chile, reemplázalo por el embutido de cerdo que más te guste."
        ],
        secciones: [
            {
                titulo: "Para la mayonesa", items: [
                    ["Con batidora de mano eléctrica:", "en un recipiente profundo pon el huevo y la taza de aceite. Usando la potencia máxima, procesa de una sola vez hasta que la mezcla haya emulsionado. Agrega sal a gusto y el jugo de limón. Vuelve a mezclar hasta que todo esté bien integrado. Pruébala y corrige la sal si fuese necesario."],
                    ["Con licuadora:", "pon en el jarro de la licuadora el huevo y la taza de aceite. Procesa a potencia media-alta hasta que emulsione. Agrega la sal y el jugo de medio limón y vuelve a procesar hasta que todo se vea bien integrado. Pruébala y corrige la sal si fuese necesario."]
                ]
            },
            {
                titulo: "Para el pebre", items: [
                    "Mezcla bien los ingredientes, corrige la sal y déjalo reposar una media hora antes de usar."
                ]
            },
            {
                titulo: "Para el arrollado", items: [
                    "Pon las rodajas de arrollado en la parrilla 5 minutos por lado o hasta que estén doradas. Mientras, calienta los panes en una zona tibia de la parrilla."
                ]
            },
            {
                titulo: "Arma los sánguches", items: [
                    "Pon la base del pan en un plato bajo y enmantequíllala ligeramente. Acomoda dos o tres rodajas de arrollado, dos cucharadas de pebre y dos de mayonesa. Pon la tapa del pan y sirve con cuchillo y tenedor si te da miedo chorrearte."
                ]
            }
        ],
        consejo: { titulo: "Hazlo antes", texto: "Puedes hacer la mayonesa y el pebre con hasta 6 horas de anticipación. Guárdalos en recipientes herméticos en el refrigerador, pero sácalos 20 minutos antes de usar para que no estén tan fríos." }
    },
    "blanquillo-boldo": {
        titulo: "Blanquillo entero con boldo y naranjas",
        intro: [
            "Este es el verdadero blanquillo (prolatilus jugularis), noble pescado de roca que abunda desde las costas centrales de Perú hasta Chiloé, al sur de Chile. Su carne blanca y suave recuerda a la mejor de las corvinas. Es una pena que se haya decidido bautizar con este mismo nombre, por motivos comerciales, al pangasius hypophthalmus, importado desde el contaminado río Mekong. Jamás compres ese impostor, que se vende también bajo el nombre de pangasio, panga, pancracio o basa.",
            "Quisimos preparar al verdadero blanquillo de una manera simple, usando nuestras ubicuas naranjas y coronado –porque es un campeón– con ramas de boldo, un árbol nativo de Chile muy aromático. También puedes usar otros pescados de carne blanca como corvinilla, rollizo, bilagay o lisa. Si no consigues boldo, reemplázalo por ramas de laurel o de romero fresco."
        ],
        pasos: [
            "Con una brocha de cocina aceita bien los pescados para que no se peguen a la parrilla. Aceita también la parrilla y procura que esté bien caliente y limpia al momento de usarla.",
            "Pon un poco de sal dentro del vientre de cada pescado y acomoda ahí mismo varias rodajas de naranja y un par de hojitas de boldo. Acomoda una rama de boldo en ambos costados de cada blanquillo, amarrando cuidadosamente con el hilo de manera que el boldo y las naranjas se mantengan en su lugar.",
            "Pon los pescados en la parrilla, por un lado primero. El boldo comenzará a achurrascarse inmediatamente. Mientras esto ocurre, anda quemando las ramitas de boldo restantes en las brasas, para así impregnar el pescado de este aroma.",
            "Al cabo de 10 a 12 minutos –dependiendo del tamaño de los pescados– da vuelta el pescado cuidadosamente. Ásalo por el otro lado un par de minutos menos que por el primer costado, o hasta que al separar la carne con un tenedor en la parte más gruesa ésta se vea blanca y cocida, pero aún jugosa. Evita sobre cocinarlo.",
            "Se puede comer como aperitivo desmenuzándolo con las manos al lado de la parrilla, o como plato de fondo con algún acompañamiento de sabor suave."
        ],
        consejo: { titulo: "Hazlo antes", texto: "Puedes dejar los blanquillos armados con hasta 5 horas de anticipación, tapados y refrigerados." }
    },
    "ajies-rellenos": {
        titulo: "Ajíes rellenos con queso maduro de vaca y envueltos en tocino",
        meta: "Preparación: 10 minutos · Cocción: 6 a 7 minutos · Para 4 personas",
        intro: "En esta receta lo importante es tener listo un fuego bien fuerte que rápidamente haga que el tocino se dore y contraiga, lo que impedirá que el queso escape de los ajíes. Como alternativa, puedes rellenarlos con queso de cabra y envolverlos en prosciutto.",
        pasos: [
            "Toma cada ají desde el tallo y con la punta de un cuchillo afilado haz un corte a lo largo, sin llegar ni al otro lado ni a la punta del ají. Abre esta incisión con cuidado y extrae la mayor cantidad de semillas y venas que sea posible, para evitar que queden tan picosos.",
            "Rellena cada ají con los bloques de queso, eliminando cualquier exceso para que luego al derretirse no se salga. Ciérralos y envuélvelos con el tocino, asegurando bien cada loncha con varios palillos.",
            "Pon los ajíes en la parrilla y ásalos por 3 minutos o hasta que se empiecen a dorar. Ponlos por el otro lado y asa 3 a 4 minutos más o hasta que el tocino se vea crocante y dorado por todas partes.",
            "Sácalos del fuego y déjalos reposar 5 minutos. Retira los palillos y corta los ajíes en trozos del tamaño de un bocado. Sirve en la misma tabla donde los cortaste."
        ],
        consejo: { titulo: "Hazlo antes", texto: "Puedes dejar los ajíes armados y tapados en el refrigerador hasta con 12 horas de anticipación." }
    }
};
function escapeHtml(t) { return String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function openRecipe(key) {
    const r = RECETAS[key];
    if (!r) return;
    document.getElementById("modalTitle").innerText = r.titulo;
    const body = document.getElementById("modalBody");
    body.style.whiteSpace = "normal";
    body.innerHTML =
        [].concat(r.intro || []).map(t => '<p class="prep-intro">' + escapeHtml(t) + '</p>').join("") +
        (r.pasos ? '<ol class="prep-steps">' + r.pasos.map(p => '<li>' + escapeHtml(p) + '</li>').join("") + '</ol>' : "") +
        (r.secciones || []).map(sec =>
            '<h4 class="prep-section-title">' + escapeHtml(sec.titulo) + '</h4>' +
            sec.items.map(it => Array.isArray(it)
                ? '<p class="prep-para"><strong>' + escapeHtml(it[0]) + '</strong> ' + escapeHtml(it[1]) + '</p>'
                : '<p class="prep-para">' + escapeHtml(it) + '</p>').join("")
        ).join("") +
        (r.consejo ? '<div class="prep-tip"><strong>' + escapeHtml(r.consejo.titulo) + '</strong>' + escapeHtml(r.consejo.texto) + '</div>' : "");
    document.getElementById("recipeModal").style.display = "flex";
}
function openModal(title, text) {
    document.getElementById("modalBody").style.whiteSpace = "pre-line";
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerText = text;
    document.getElementById("recipeModal").style.display = "flex";
}
function closeModal() { document.getElementById("recipeModal").style.display = "none"; }
document.getElementById("recipeModal").addEventListener("click", event => {
    if (event.target.id === "recipeModal") closeModal();
});
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });