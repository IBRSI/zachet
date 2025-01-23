// Получаем ссылку на canvas
const canvas = document.getElementById("renderCanvas");

// Создаем движок
const engine = new BABYLON.Engine(canvas, true);

// Создаем сцену
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    // Создаем камеру
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Создаем свет
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // Загружаем GLB модель
BABYLON.SceneLoader.Append("rabbit.glb", "", scene, function (scene) {
    // Модель загружена, вы можете настроить ее здесь
    const model = scene.getMeshByName("YourModelName"); // Замените "YourModelName" на имя вашей модели
    if (model) {
        model.position.y = 0; // Устанавливаем позицию модели
    }
});
        // Добавляем взаимодействие с моделью
        model.actionManager = new BABYLON.ActionManager(scene);
        model.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
            alert("Вы выбрали модель! Это персонаж из вашего любимого фильма!");
        }));
    });

    return scene;
};

// Создаем сцену
const scene = createScene();

// Запускаем рендеринг
engine.runRenderLoop(function () {
    scene.render();
});

// Обрабатываем изменение размера окна
window.addEventListener("resize", function () {
    engine.resize();
});
