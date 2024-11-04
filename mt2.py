from prettytable import PrettyTable

class TuringMachine:
    def __init__(self):
        self.states = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'}
        self.tape = []
        self.head_position = 0
        self.state = 'A'
        self.transitions = {
            ('A', '0'): ('A', '0', 'R'),
            ('A', '1'): ('B', '0', 'R'),
            ('B', '0'): ('C', '0', 'R'),
            ('B', '1'): ('B', '1', 'R'),
            ('C', '0'): ('D', '1', 'L'),
            ('C', '1'): ('C', '1', 'R'),
            ('D', '0'): ('E', '0', 'L'),
            ('D', '1'): ('D', '1', 'L'),
            ('E', '0'): ('H', '1', 'L'),
            ('E', '1'): ('F', '1', 'L'),
            ('F', '0'): ('G', '1', 'R'),
            ('F', '1'): ('F', '1', 'L'),
            ('G', '0'): ('A', '0', 'S'),
            ('G', '1'): ('A', '1', 'S'),
            ('H', '1'): ('I', '1', 'R'),
            ('I', '0'): ('@', '0', 'S'),
            ('I', '1'): ('I', '1', 'L')
        }

    def run(self, input_string):
        self.tape = list(input_string) + ['_']  # Usar '_' como símbolo en blanco
        self.head_position = 0
        self.state = 'A'
        steps = []

        while True:
            current_symbol = self.tape[self.head_position]
            steps.append((self.state, ''.join(self.tape), self.head_position))

            if (self.state, current_symbol) in self.transitions:
                new_state, new_symbol, direction = self.transitions[(self.state, current_symbol)]
                self.tape[self.head_position] = new_symbol
                self.state = new_state
                
                if direction == 'R':
                    self.head_position += 1
                elif direction == 'L':
                    self.head_position -= 1
                elif direction == 'S':
                    self.head_position += 0
            else:

                break  # No hay transición definida, detener la máquina

            # Verificar si alcanzamos el símbolo '@' para detener
            if current_symbol == '@':
                break

        return steps

    def print_steps(self, steps):
        table = PrettyTable()
        table.field_names = ["Estado", "Cinta"]

        for step in steps:
            tape_str = ''.join(step[1])
            head_marker = [' '] * len(tape_str)
            head_marker[step[2]] = '^'  # Marcador de posición del cabezal
            table.add_row([step[0], tape_str])
            table.add_row(["", ''.join(head_marker)])  # Flecha debajo de la cinta

        print(table)

# Solicitar al usuario que ingrese la cadena
input_string = input("Ingresa la cadena de unos y ceros: ")
tm = TuringMachine()
steps = tm.run(input_string)

# Imprimir todos los pasos en formato de tabla
tm.print_steps(steps)

# Imprimir el resultado final
final_tape = ''.join(tm.tape)
print(f"\nResultado final en la cinta: {final_tape}")
