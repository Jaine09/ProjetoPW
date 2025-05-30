# Clínica da Mulher – Sistema de Cadastro, Login e Agendamento

Este projeto é um sistema web simulado de agendamento e gestão para uma clínica voltada à saúde da mulher. Ele foi desenvolvido como parte de um trabalho acadêmico para o curso de **Análise e Desenvolvimento de Sistema** do **Centro Universitário Senac**, no ano de **2025**.

## 🧠 Objetivo

Simular o funcionamento de um sistema básico de clínica médica, permitindo que usuárias:

- Criem contas com dados pessoais
- Sejam redirecionadas para cadastro de responsável (se menores de idade)
- Realizem login
- Agendem consultas
- Visualizem histórico
- Façam recuperação de senha por **palavra-chave**, sem e-mail

## 🛠️ Funcionalidades

### 👩 Cadastro de Usuária
- Nome completo, data de nascimento, CPF, endereço via CEP
- Cálculo automático de idade
- Cadastro de responsável (caso menor de idade)
- Palavra-chave de recuperação de senha

### 🔑 Login
- Validação com base no `localStorage`
- Redirecionamento para área do paciente

### 🕒 Agendamento
- Escolha de especialidade, data e hora
- Visualização de histórico de consultas

### 🔁 Recuperação de Senha
- Simulada via palavra-chave cadastrada
- Redefinição de senha sem envio de código

## 🧰 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (puro)
- `localStorage` para simular banco de dados
- API ViaCEP (para busca de endereço)
- API Geoapify (para cálculo de distância)

## 🎓 Sobre

Projeto desenvolvido por Jaíne Jesus Costa para a disciplina de Programação Web, com apoio da colega Camile Vitória.

**Centro Universitário Senac – 2025**
