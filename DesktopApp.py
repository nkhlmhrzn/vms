import sys
import subprocess
from PyQt5.QtWidgets import QApplication, QPushButton, QVBoxLayout, QWidget

class AppLauncher(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("React App Launcher")
        self.setGeometry(100, 100, 300, 200)

        # Create a button to launch the React app
        self.launch_button = QPushButton("Launch React App", self)
        self.launch_button.clicked.connect(self.launch_react_app)

        # Set up the layout
        layout = QVBoxLayout()
        layout.addWidget(self.launch_button)
        self.setLayout(layout)

    def launch_react_app(self):
        # Launch the React app
        try:
            p = subprocess.Popen('run.bat', shell=True)

        except Exception as e:
            print(f"Error launching React app: {e}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    launcher = AppLauncher()
    launcher.show()
    sys.exit(app.exec_())
