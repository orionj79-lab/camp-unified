const { db, initDB } = require('./db');

initDB();

// Semillas para Productos
const insertProduct = db.prepare('INSERT OR IGNORE INTO products (id, name, type, description, price) VALUES (?, ?, ?, ?, ?)');
insertProduct.run(1, 'Diplomado Inteligencia Emocional', 'course', '7 semanas de formación ejecutiva', 7500);
insertProduct.run(2, 'Libro: Esperando contra toda esperanza', 'book', 'E-book descargable', 200);

// Usuario Demo
const insertUser = db.prepare('INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)');
insertUser.run(1, 'Alumno Demo', 'demo@mindhub.com', 'demo123', 'student');

// Inscripción Demo
const insertEnrollment = db.prepare('INSERT OR IGNORE INTO enrollments (user_id, product_id, access_status) VALUES (?, ?, ?)');
insertEnrollment.run(1, 1, 'active');
insertEnrollment.run(1, 2, 'active');

// Semillas para Contenido del Diplomado
const insertContent = db.prepare('INSERT INTO contents (product_id, week, title, lessons, order_index) VALUES (?, ?, ?, ?, ?)');

const diplomadoContent = [
  { week: 'Semana 1', title: 'Autoconocimiento estratégico', lessons: JSON.stringify(['Bienvenida y ruta', 'Diagnóstico actual', 'Evaluación inicial']) },
  { week: 'Semana 2', title: 'Análisis de pérdidas y recursos', lessons: JSON.stringify(['Pérdidas invisibles', 'Mapa de recursos', 'Ejercicio práctico']) },
  { week: 'Semana 3', title: 'Redes y entorno', lessons: JSON.stringify(['Mapa de apoyos', 'Lectura guiada', 'Sesión en vivo']) },
  { week: 'Semana 4', title: 'Dirección estratégica', lessons: JSON.stringify(['Claridad operativa', 'Toma de decisiones', 'Formato semanal']) },
  { week: 'Semana 5', title: 'Mentalidad y bloqueos', lessons: JSON.stringify(['Creencias limitantes', 'Reencuadre', 'Bitácora']) },
  { week: 'Semana 6', title: 'Oportunidades', lessons: JSON.stringify(['Observación entorno', 'Ideas viables', 'Plantilla']) },
  { week: 'Semana 7', title: 'Modelo de ingreso', lessons: JSON.stringify(['Propuesta inicial', 'Modelo base', 'Validación']) },
  { week: 'Cierre', title: 'Plan de acción', lessons: JSON.stringify(['Ruta implementando', 'Checklist final', 'Constancia']) }
];

// Limpiar antes de insertar para evitar duplicados en desarrollo
db.prepare('DELETE FROM contents').run();

diplomadoContent.forEach((c, index) => {
  insertContent.run(1, c.week, c.title, c.lessons, index + 1);
});

console.log('--- Database Seeded with Diplomado Content ---');
process.exit(0);
