// app.js

// Функция для создания шляпы
const buildHat = function (scene, parent, props) {
    // Создание материала для шляпы
    const hatMaterial = new BABYLON.StandardMaterial("hatMaterial", scene);
    hatMaterial.diffuseColor = new BABYLON.Color3(1, 0.8, 0); // Цвет шляпы

    // Создание верхней части шляпы
    const top = BABYLON.MeshBuilder.CreateCylinder("hatTop", {diameter: props.topDiameter, height: props.topHeight}, scene);
    top.position.y += props.topHeight / 2; // Поднимаем верхнюю часть шляпы
    top.material = hatMaterial;

    // Создание поля шляпы
    const brim = BABYLON.MeshBuilder.CreateCylinder("hatBrim", {diameter: props.brimDiameter, height: props.brimHeight}, scene);
    brim.position.y -= props.brimHeight / 2; // Опускаем поле шляпы
    brim.material = hatMaterial;

    // Объединение верхней части и поля шляпы
    const hat = BABYLON.Mesh.MergeMeshes([top, brim], true, false, null, false, false);
    hat.position.x = props.positionX;
    hat.position.y = props.positionY;
    hat.position.z = props.positionZ;
    hat.parent = parent;

    return hat;
}

// Функция для создания сцены
const createScene = function(engine) {
    const scene = new BABYLON.Scene(engine);

    // Создание камеры
    const alpha = 3 * Math.PI / 2;
    const beta = Math.PI / 4;
    const radius = 10;
    const target = new BABYLON.Vector3(0, 0, 0);
    const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);

    // Создание света
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Создание родительского узла для шляпы
    const hatParent = new BABYLON.TransformNode("hatParent");

    // Параметры шляпы
    const hatParams = {
        topDiameter: 2,
        topHeight: 1,
        brimDiameter: 3,
        brimHeight: 0.5,
        positionX: 0,
        positionY: 1,
        positionZ: 0
    };

    // Создание шляпы
    buildHat(scene, hatParent, hatParams);

    return scene;
}

// Основная функция для запуска приложения
const runApp = function() {
    const canvas = document.getElementById("renderCanvas"); // Получаем элемент canvas
    const engine = new BABYLON.Engine(canvas, true); // Создаем движок

    const scene = createScene(engine); // Создаем сцену

    // Запуск рендеринга
    engine.runRenderLoop(function() {
        scene.render();
    });

    // Обработка изменения размера окна
    window.addEventListener("resize", function() {
        engine.resize();
    });
}

// Запуск приложения
runApp();
