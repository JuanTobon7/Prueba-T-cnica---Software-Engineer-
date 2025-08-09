import 'package:flutter/material.dart';
import 'package:mobile/api/task/api.task.dart';
import 'package:mobile/api/conf/api.dart';
import 'package:mobile/common/AddTaskDialog.dart';
import 'package:mobile/common/AlertError.dart';
import 'package:mobile/common/TaskEnum.dart';
import 'package:mobile/components/taskCard.dart';
import 'package:mobile/models/task.dto.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  String _messageError = '';
  String _dateStr = '';
  List<TaskDto>? tasks;
  bool _isLoading = true;
  DateTime _date = DateTime.now();
  bool _menuOpen = false;
  final ScrollController _scrollController = ScrollController();

  ApiTask apiTask = ApiTask(ApiClient());

  String _formatDate(DateTime date) {
    final utcDate = DateTime.utc(date.year, date.month, date.day);
    return "${utcDate.year.toString().padLeft(4, '0')}-"
        "${utcDate.month.toString().padLeft(2, '0')}-"
        "${utcDate.day.toString().padLeft(2, '0')}";
  }


  Future<void> createTaskFun(String title, String description) async{
    try{
      if(title.isEmpty) return;
      final data = {
        'title': title,
        'description': description,
        'createdAt': DateTime.now().toIso8601String()
      };
      print('data is just here $data');
      TaskDto taskRes = await apiTask.createTaskDto(data);
      setState((){
        if(taskRes.title.isEmpty || taskRes.description.isEmpty || taskRes.id.isEmpty ) return;
        tasks!.add(taskRes);
      });
      await _getList();
      _scrollController.animateTo(
        0.0,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeOut,
      );
    } on FormatException {
      ErrorDescription('Titulo no dado');
    }
    catch(e){
      ErrorDescription('un error inesperado a ocurrido');
    }
  }

  @override
  void initState() {
    super.initState();
    _date = DateTime.now();
    _dateStr = _formatDate(_date);
    _getList();
  }

  Future<void> _getList() async {
    try {
      String status = '';
      final params = {
        "date": _dateStr,
        "status": status,
      };
      final response = await apiTask.getListTask(params);
      setState(() {
        tasks = response;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _messageError = 'Error al obtener tareas: $e';
        _isLoading = false;
      });
    }
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _date,
      firstDate: DateTime(2020),
      lastDate: DateTime(2100),
    );

    if (picked != null) {
      setState(() {
        _date = DateTime(picked.year, picked.month, picked.day);
        _dateStr = _formatDate(_date);
        _isLoading = true;
      });

      await _getList();
    }
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> floatingButtons = [];

    if (_menuOpen) {
      floatingButtons = [
        Container(
          margin: const EdgeInsets.only(bottom: 70),
          child: FloatingActionButton(
            heroTag: 'add',
            mini: true,
            onPressed: () {
              showDialog(
                context: context,
                barrierDismissible: false, // para que no se cierre tocando afuera
                builder: (context) => AddTaskDialog(
                  onSave: createTaskFun,
                ),
               );
              },
            child: const Icon(Icons.add),
          ),
        ),
        Container(
          margin: const EdgeInsets.only(bottom: 130),
          child: FloatingActionButton(
            heroTag: 'done',
            mini: true,
            onPressed: () => print('Botón Extra 2 presionado'),
            child: const Icon(Icons.done),
          ),
        ),
        Container(
          margin: const EdgeInsets.only(bottom: 190),
          child: FloatingActionButton(
            heroTag: 'pending',
            mini: true,
            onPressed: () => print('Botón Extra 3 presionado'),
            child: const Icon(Icons.pending),
          ),
        ),
      ];
    }

    floatingButtons.add(
      FloatingActionButton(
        heroTag: 'main',
        onPressed: () {
          setState(() {
            _menuOpen = !_menuOpen;
          });
        },
        tooltip: _menuOpen ? 'Cerrar menú' : 'Abrir menú',
        child: Icon(_menuOpen ? Icons.close : Icons.menu),
      ),
    );

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text("Gestor de Tareas Personal"),
        actions: [
          IconButton(
            icon: const Icon(Icons.date_range),
            onPressed: _selectDate,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : tasks == null || tasks!.isEmpty
          ? const Center(child: Text("No hay tareas disponibles"))
          : ListView(
        padding: const EdgeInsets.all(20),
        controller: _scrollController,
        children: [
          const Text(
            'Hola Bienvenido a tu Gestor de Tareas',
            style:
            TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
          ),
          Text(
            '$_counter',
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          const SizedBox(height: 20),
          for (var task in tasks!)
            MyCardTask(
              title: task.title,
              description: task.description,
              status: (task.dailyTasks.status.isNotEmpty ||
                  TaskEnum.fromString(task.dailyTasks.status)
                      .label
                      .isEmpty)
                  ? TaskEnum.fromString(task.dailyTasks.status)
                  : TaskEnum.PENDING,
            ),

        ],
       ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      floatingActionButton: Stack(
        alignment: Alignment.bottomRight,
        children: floatingButtons,
      ),
    );
  }
}
