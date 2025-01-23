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

    // Загружаем 3D модель (например, модель персонажа из фильма)
    BABYLON.SceneLoader.ImportMesh("", "rabbit", "scene.gltf", scene, function (meshes) {
        const model = meshes[0];
        model.position.y = 0;

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
