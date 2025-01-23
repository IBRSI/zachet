// Создаем сцену и движок
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Создаем камеру
const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Создаем свет
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Загружаем GLB модель
BABYLON.SceneLoader.Append("rabbit.glb", "", scene, function (scene) {
    // Модель загружена, вы можете настроить ее здесь
    const model = scene.getMeshByName("YourModelName"); // Замените "YourModelName" на имя вашей модели
    if (model) {
        model.position.y = 0; // Устанавливаем позицию модели
    }
});

// Запускаем рендеринг
engine.runRenderLoop(function () {
    scene.render();
});

// Обработка изменения размера окна
window.addEventListener("resize", function () {
    engine.resize();
});
