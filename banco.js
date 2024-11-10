import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class ContaBancaria {
    private String numeroConta;
    private String titular;
    private double saldo;

    public ContaBancaria(String numeroConta, String titular) {
        this.numeroConta = numeroConta;
        this.titular = titular;
        this.saldo = 0.0;
    }

    public String getNumeroConta() {
        return numeroConta;
    }

    public String getTitular() {
        return titular;
    }

    public double getSaldo() {
        return saldo;
    }

    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
            System.out.println("Depósito de R$ " + valor + " realizado com sucesso!");
        } else {
            System.out.println("Valor de depósito inválido.");
        }
    }

    public void sacar(double valor) {
        if (valor > 0 && valor <= saldo) {
            saldo -= valor;
            System.out.println("Saque de R$ " + valor + " realizado com sucesso!");
        } else {
            System.out.println("Valor de saque inválido ou saldo insuficiente.");
        }
    }
}

class Banco {
    private List<ContaBancaria> contas;

    public Banco() {
        this.contas = new ArrayList<>();
    }

    public void criarConta(String numeroConta, String titular) {
        ContaBancaria novaConta = new ContaBancaria(numeroConta, titular);
        contas.add(novaConta);
        System.out.println("Conta criada com sucesso para " + titular + "!");
    }

    public ContaBancaria buscarConta(String numeroConta) {
        for (ContaBancaria conta : contas) {
            if (conta.getNumeroConta().equals(numeroConta)) {
                return conta;
            }
        }
        return null;
    }

    public void exibirContas() {
        System.out.println("Contas no banco:");
        for (ContaBancaria conta : contas) {
            System.out.println("Conta: " + conta.getNumeroConta() + ", Titular: " + conta.getTitular() + ", Saldo: R$ " + conta.getSaldo());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Banco banco = new Banco();
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            System.out.println("\n1. Criar Conta");
            System.out.println("2. Depositar");
            System.out.println("3. Sacar");
            System.out.println("4. Consultar Saldo");
            System.out.println("5. Exibir Todas as Contas");
            System.out.println("6. Sair");
            System.out.print("Escolha uma opção: ");
            int opcao = scanner.nextInt();
            scanner.nextLine(); // Consumir a nova linha

            switch (opcao) {
                case 1:
                    System.out.print("Número da conta: ");
                    String numeroConta = scanner.nextLine();
                    System.out.print("Titular da conta: ");
                    String titular = scanner.nextLine();
                    banco.criarConta(numeroConta, titular);
                    break;
                case 2:
                    System.out.print("Número da conta: ");
                    numeroConta = scanner.nextLine();
                    ContaBancaria contaDeposito = banco.buscarConta(numeroConta);
                    if (contaDeposito != null) {
                        System.out.print("Valor a depositar: ");
                        double valorDeposito = scanner.nextDouble();
                        contaDeposito.depositar(valorDeposito);
                    } else {
                        System.out.println("Conta não encontrada.");
                    }
                    break;
                case 3:
                    System.out.print("Número da conta: ");
                    numeroConta = scanner.nextLine();
                    ContaBancaria contaSaque = banco.buscarConta(numeroConta);
                    if (contaSaque != null) {
                        System.out.print("Valor a sacar: ");
                        double valorSaque = scanner.nextDouble();
                        contaSaque.sacar(valorSaque);
                    } else {
                        System.out.println("Conta não encontrada.");
                    }
                    break;
                case 4:
                    System.out.print("Número da conta: ");
                    numeroConta = scanner.nextLine();
                    ContaBancaria contaConsulta = banco.buscarConta(numeroConta);
                    if (contaConsulta != null) {
                        System.out.println("Saldo da conta " + numeroConta + ": R$ " + contaConsulta.getSaldo());
                    } else {
                        System.out.println("Conta não encontrada.");
                    }
                    break;
                case 5:
                    banco.exibirContas();
                    break;
                case 6:
                    System.out.println("Saindo...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Opção inválida.");
            }
        }
    }
}
