import "../index/style.less";
import src from "./img.jpg";

async function test() {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  const img = document.createElement("img");
  img.src = src;
  document.body.appendChild(img);
}

test();
