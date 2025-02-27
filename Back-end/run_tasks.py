import schedule
import time
from app.tasks import process_subscriptions

def run_scheduler():
    """Ejecuta la tarea de procesamiento de suscripciones automáticamente cada día."""
    schedule.every().day.at("00:00").do(process_subscriptions)  # Ejecutar a medianoche
    print("⏳ Procesador de suscripciones en ejecución...")

    while True:
        schedule.run_pending()
        time.sleep(60)  # Espera un minuto antes de revisar nuevamente

if __name__ == "__main__":
    run_scheduler()
