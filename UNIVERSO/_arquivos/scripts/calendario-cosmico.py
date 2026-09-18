# calendario-cosmico.py - a regua do ano cosmico da serie Universo (D11 do plano).
#
# Converte "anos atras" (ou "anos depois do Big Bang") na data do Calendario Cosmico
# com a regua de 13,797 bilhoes de anos (Planck 2018), num ano de 365 dias:
#   1 dia = 37.800.000 anos · 1 hora = 1.575.000 · 1 minuto = 26.250 · 1 segundo = 437,5
# Nunca misturar com 13,8 arredondado: as contas deixam de fechar redondas.
#
# USO
#   python calendario-cosmico.py                       imprime a tabela dos marcos da serie
#   python calendario-cosmico.py atras 4540000000      a data de um evento de 4,54 bi de anos atras
#   python calendario-cosmico.py depois 380000         a data de um evento 380 mil anos depois do inicio
#
# Fonte de cada marco: UNIVERSO/plano/serie/_pesquisa-inicial.md (secoes 2, 3 e 4).

import sys

IDADE = 13_797_000_000          # anos, Planck 2018 (TT,TE,EE+lowE+lensing)
DIAS_DO_ANO = 365
ANOS_POR_DIA = IDADE / DIAS_DO_ANO   # 37.800.000
MESES = [("janeiro", 31), ("fevereiro", 28), ("marco", 31), ("abril", 30), ("maio", 31), ("junho", 30),
         ("julho", 31), ("agosto", 31), ("setembro", 30), ("outubro", 31), ("novembro", 30), ("dezembro", 31)]

# (marco, anos ATRAS; None quando o valor e "anos depois do Big Bang")
MARCOS = [
    ("Inicio do big bang quente (o que o Planck data)", IDADE),
    ("Fundo cosmico de micro-ondas, 380 mil anos depois (traducao do z* pelo modelo)", IDADE - 380_000),
    ("Primeiras estrelas, z ~ 30 (modelo, ~100 milhoes de anos depois)", IDADE - 100_000_000),
    ("MoM-z14, a galaxia mais distante (~280 milhoes de anos depois)", IDADE - 280_000_000),
    ("Disco espesso da Via Lactea comeca (~800 milhoes de anos depois)", IDADE - 800_000_000),
    ("Fusao com a Gaia-Enceladus (cerca de 10 bilhoes de anos atras, uma das tres datas)", 10_000_000_000),
    ("Inclusoes de meteorito (o 'Sol'), 4,5673 bilhoes", 4_567_300_000),
    ("Terra, 4,54 bilhoes (USGS)", 4_540_000_000),
    ("Estromatolitos de Strelley Pool, 3,43 bilhoes", 3_430_000_000),
    ("Grande Evento de Oxidacao, 2,33 bilhoes (uma das tres datas)", 2_330_000_000),
    ("Qingshania, multicelular aceito, 1,635 bilhoes", 1_634_800_000),
    ("Bangiomorpha, 1,047 bilhoes", 1_047_000_000),
    ("Mistaken Point (Ediacara), 574 milhoes", 574_170_000),
    ("Base do Cambriano, 538,8 milhoes", 538_800_000),
    ("Plantas em terra, 473 milhoes", 473_000_000),
    ("Animal terrestre datado (Kerrera), 425 milhoes", 425_000_000),
    ("Fim do Permiano, 251,9 milhoes", 251_900_000),
    ("Primeiros dinossauros (Ischigualasto), 231,4 milhoes", 231_400_000),
    ("Impacto de Chicxulub, 66,04 milhoes", 66_038_000),
    ("Separacao humano-chimpanze, 7,5 milhoes (faixa 7 a 8)", 7_500_000),
    ("Genero Homo (Ledi-Geraru), 2,8 milhoes", 2_800_000),
    ("Homo sapiens (Jebel Irhoud), 315 mil", 315_000),
    ("Base do Holoceno, 11.700", 11_700),
    ("Escrita (cuneiforme, cerca de 3200 a.C.), ~5.200", 5_200),
]


def data_do_calendario(anos_atras):
    """Devolve (dia do ano, mes, dia, hora, minuto, segundo) pra um evento de N anos atras."""
    dias_corridos = (IDADE - anos_atras) / ANOS_POR_DIA
    dia_do_ano = int(dias_corridos)
    fracao = dias_corridos - dia_do_ano
    segundos_do_dia = round(fracao * 86400)
    if dia_do_ano >= DIAS_DO_ANO:
        dia_do_ano, segundos_do_dia = DIAS_DO_ANO - 1, 86399
    mes, dia = nome_do_dia(dia_do_ano)
    return dia_do_ano, mes, dia, segundos_do_dia // 3600, (segundos_do_dia % 3600) // 60, segundos_do_dia % 60


def nome_do_dia(dia_do_ano):
    restante = dia_do_ano
    for nome, dias in MESES:
        if restante < dias:
            return nome, restante + 1
        restante -= dias
    return "dezembro", 31


def por_extenso(anos_atras):
    _, mes, dia, hora, minuto, segundo = data_do_calendario(anos_atras)
    if anos_atras < 100_000_000:
        return f"{dia} de {mes}, {hora:02d}:{minuto:02d}:{segundo:02d}"
    return f"{dia} de {mes}, {hora:02d}:{minuto:02d}"


def tabela():
    print("| Marco | Anos atras | No calendario |")
    print("|---|---|---|")
    for nome, anos_atras in MARCOS:
        anos_com_ponto = f"{anos_atras:,}".replace(",", ".")
        print(f"| {nome} | {anos_com_ponto} | {por_extenso(anos_atras)} |")


def main():
    if len(sys.argv) == 1:
        tabela()
        return
    modo, valor = sys.argv[1], float(sys.argv[2])
    anos_atras = valor if modo == "atras" else IDADE - valor
    print(por_extenso(anos_atras))


if __name__ == "__main__":
    main()
