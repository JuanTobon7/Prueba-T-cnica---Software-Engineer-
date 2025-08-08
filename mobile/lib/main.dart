import 'package:flutter/material.dart';
import 'package:mobile/common/TaskEnum.dart';
import 'package:mobile/components/taskCard.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gestor de Tareas Personal',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
      ),
      home: const MyHomePage(title: 'Gestor de Tareas Personal'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    final tasks = [
      {
        "title": "Comprar comida",
        "description": "Leche, pan, huevos y frutas.",
        "status": TaskEnum.PENDING
      },
      {
        "title": "Hacer ejercicio",
        "description": "Correr 5 km en el parque.",
        "status": TaskEnum.DONE
      },
      {
        "title": "Estudiar Flutter",
        "description": "Avanzar en el módulo de widgets.",
        "status": TaskEnum.PENDING
      },
    ];
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: ListView(
          children: [
            Padding(
              padding: EdgeInsetsGeometry.only(left: 20, top:20, right:20, bottom:10),
                child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                const Text('Hola Bienvenido a tu Gestor de Tareas',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                Text(
                  '$_counter',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
              ],
            ),
          ),
            for (var task in tasks)
              MyCardTask(
                title: task["title"] as String,
                description: task["description"] as String,
                status: task["status"] as TaskEnum,
              )
          ]
        ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
