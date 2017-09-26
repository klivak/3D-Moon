window.onload = function () {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

	var render = new THREE.WebGLRenderer({anialias: true});
	render.setSize(window.innerWidth, window.innerHeight); // задаем высоту и ширину
	render.setClearColor(0x000); // задаем цвет бекграунд
	document.body.appendChild(render.domElement); //добавляем элемент

	camera.position.z = 150; //отодвигаем камеру

	// var light = new THREE.DirectionalLight(0x999999, 1);	//	главный источник света
	// scene.add(light);

	var amColor = "#ffffff";
	var amLight = new THREE.AmbientLight(amColor); //подсветка
	scene.add(amLight);


	var manager = new THREE.LoadingManager(); //менеджер загрузок
	var loader = new THREE.ImageLoader(manager); //будем создавать изображение

	var texturePlanet = new THREE.Texture();

	loader.load('model/MoonMap2_2500x1250.jpg', function (image) {
		texturePlanet.image = image; // dobavlaem
		texturePlanet.needsUpdate = true; //chtobi obnovilos
	}); //загрузчик текстуры модели


	var meshes = [];  //текстура, первоначальная текстура

	var objLoader = new THREE.OBJLoader();

	objLoader.load('model/moon.obj', function (object) {
		console.log(object);
		// пройтись по всем дочерним обєктам

		object.traverse(function (child) {
			if (child instanceof THREE.Mesh) { //сверили их тим
				meshes.push(child); //добавили в массив
			}
		});

		var planet = meshes[0];

		planet.position.y = 0;
		// planet.rotation.y +=0.01;

		scene.add(planet);

		var bumpMapPlanet = new THREE.TextureLoader().load('/model/moon-normal.jpg ');

		planet.material = new THREE.MeshPhongMaterial({
			map: texturePlanet,
			bumpMap: bumpMapPlanet,
			specular: 0xfff7e8,
			bumpScale: 1
		});

	});

	var controls = new THREE.OrbitControls(camera);

	var update = function () {
		var planet = meshes[0];

		// planet.position.y = 0;
		planet.rotation.y +=0.001;
	};

	var rendering = function () {
		requestAnimationFrame(rendering);
		controls.update();
		render.render(scene, camera);

		update();
	};

	rendering();


};