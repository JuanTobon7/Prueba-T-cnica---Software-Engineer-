import 'package:flutter/material.dart';
import 'package:mobile/common/TaskEnum.dart';

class MyCardTask extends StatefulWidget {
  final String title;
  final String description;
  final TaskEnum status;

  const MyCardTask({
    super.key,
    required this.title,
    required this.description,
    required this.status,
  });

  @override
  State<MyCardTask> createState() => _MyCardTaskState();
}

class _MyCardTaskState extends State<MyCardTask> {
  Color colorStatus = Colors.black54;
  IconData iconButton = Icons.check_circle;
  @override
  void initState() {
    super.initState();
    // Inicializo el color, si no tiene, pongo gris por defecto
    colorStatus = widget.status == TaskEnum.DONE ? Colors.green : Colors.black54;
    iconButton = widget.status == TaskEnum.DONE ? Icons.check_circle : Icons.cancel;
  }

  void _toggleStatus() {
    setState(() {      
      if (colorStatus == Colors.green && iconButton == Icons.check_circle ) {
        colorStatus = Colors.black54;
        iconButton = Icons.cancel;        
      } else {
        iconButton = Icons.check_circle;
        colorStatus = Colors.green;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,    
      margin: const EdgeInsets.all(12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.title,                  
                  style: TextStyle(
                    fontSize: 20, 
                    fontWeight: FontWeight.w700,
                    color: colorStatus
                    ),
                ),
                CircleAvatar(radius: 10, backgroundColor: colorStatus),
              ],
            ),
            const SizedBox(height: 8),
            Text(widget.description),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Estado: ${widget.status.label}"),
                IconButton(
                  icon: Icon(iconButton),
                  color: colorStatus,
                  iconSize: 30,
                  onPressed: _toggleStatus,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
