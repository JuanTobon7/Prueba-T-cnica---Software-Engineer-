import 'package:flutter/material.dart';

class AddTaskDialog extends StatefulWidget {
  final void Function(String title, String description) onSave;
  const AddTaskDialog({
    super.key,
    required this.onSave
  });

  @override
  State<AddTaskDialog> createState() => _AddTaskDialogState();
}

class _AddTaskDialogState extends State<AddTaskDialog> {
  String _title = '';
  String _description = '';
  String messageError = '';
  void _toggleCreate(){
    if(_title.isEmpty){
      setState(() {
        messageError = 'Titulo no porporcionado!';
      });
      return;
    }

    widget.onSave(_title,_description);
    Navigator.of(context).pop();

  }

  @override
  Widget build(BuildContext context) {
    return Dialog( // <-- en vez de AlertDialog para personalizar más
      backgroundColor: Colors.white,
      insetPadding: const EdgeInsets.all(20), // margen en pantalla
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Añadir Tarea',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            TextField(
              onChanged: (text) => _title = text,
              decoration: const InputDecoration(
                labelText: 'Título',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              onChanged: (text) => _description = text,
              decoration: const InputDecoration(
                labelText: 'Descripción',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            if(messageError.isNotEmpty)
              Text(messageError,
              style: TextStyle(color: Colors.red, fontSize: 15, fontWeight: FontWeight.w800),)
            ,
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () => Navigator.of(context).pop(),
                  child: const Text('Cancelar'),
                ),
                ElevatedButton(
                  onPressed: () {
                    _toggleCreate();
                  },
                  child: const Text('Guardar'),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
