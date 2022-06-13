export async function run(texts, handler, renderer, timer) {
    // Getting a random text from text.json
    let text = texts[Math.floor(Math.random() * texts.length)].history;
    // text = "Salut toi";
    renderer.render(text);
    handler.init(text, timer);
}