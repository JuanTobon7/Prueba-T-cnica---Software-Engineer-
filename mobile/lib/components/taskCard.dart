import 'package:flutter/material.dart';
import 'package:mobile/common/TaskEnum.dart';

class MyCardTask extends StatelessWidget {
  final String title;
  final String description;
  final TaskEnum status;
  final Color? circleColor;

  const MyCardTask({
    super.key,
    required this.title,
    required this.description,
    required this.status,
    this.circleColor
  });

  Color _circleColor() {
    if (status.name == 'DONE') return Colors.green;
    return Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.all(12),
      child: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(
                        fontSize: 20, fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Text(description),
                const SizedBox(height: 24), // space for the circle avatar above
                Text("Estado: ${status.label}"),
              ],
            ),
          ),
          Positioned(
            top: 18,
            right: 18,
            child: CircleAvatar(
              radius: 10,
              backgroundColor: _circleColor(),
            ),
          ),
        ],
      ),
    );
  }
}
