<?php
declare(strict_types=1);

/**
 * Contador de visitas — Vivero Luchito
 *
 * Guarda el total acumulado en ../contador.txt — un nivel arriba de public_html,
 * fuera del repo y sin acceso por URL. Se crea solo la primera vez.
 * Responde JSON:  {"visitas": 1284}
 */

// true  → cuenta una sola vez por sesión (recargar la página no suma)
// false → cuenta cada carga de la página
const CONTAR_UNA_VEZ_POR_SESION = false;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

$archivo = __DIR__ . '/../contador.txt';

$incrementar = true;
if (CONTAR_UNA_VEZ_POR_SESION) {
  session_start();
  if (!empty($_SESSION['visita_contada'])) {
    $incrementar = false;
  } else {
    $_SESSION['visita_contada'] = true;
  }
}

// 'c+' abre para lectura/escritura y crea el archivo si no existe, sin truncarlo
$fp = @fopen($archivo, 'c+');

if ($fp === false) {
  http_response_code(500);
  echo json_encode(['error' => 'No se pudo abrir el archivo del contador']);
  exit;
}

$visitas = 0;

// Bloqueo exclusivo: evita que dos visitas simultáneas pisen el mismo número
if (flock($fp, LOCK_EX)) {
  $visitas = (int) trim((string) stream_get_contents($fp));
  if ($visitas < 0) {
    $visitas = 0;
  }

  if ($incrementar) {
    $visitas++;
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, (string) $visitas);
    fflush($fp);
  }

  flock($fp, LOCK_UN);
}

fclose($fp);

echo json_encode(['visitas' => $visitas]);
