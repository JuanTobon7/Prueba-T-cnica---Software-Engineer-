import 'package:dio/dio.dart'; 
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiClient {
  // instancia singleton privada
  static final ApiClient _instance = ApiClient._internal();
  static String accessToken = '';
  // factory pública que devuelve la misma instancia siempre
  factory ApiClient() => _instance;

  late final Dio dio;

  // constructor privado
  ApiClient._internal() {
    dio = Dio(BaseOptions(
      baseUrl: dotenv.env['API_URL'] ?? 'http://127.0.0.1:3000/api/v1',
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
    ));

    // opcional: interceptores, logging, etc
    dio.interceptors.add(LogInterceptor(responseBody: true));

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options,handler){
            if(accessToken.isNotEmpty){
              options.headers['Authorization'] = 'Bearer $accessToken';
            }
            return handler.next(options);
        }
      )
    );
  }
}