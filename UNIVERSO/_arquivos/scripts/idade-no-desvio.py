"""idade-no-desvio: quantos anos depois do início corresponde um desvio para o vermelho (z).

Essa conta é TRADUÇÃO PELO MODELO, nunca medida: é o ΛCDM plano com os parâmetros do
Planck 2018 (H0 = 67,66 km/s/Mpc, Ωm = 0,3111; Planck 2018 VI, tabela 2, coluna
TT,TE,EE+lowE+lensing+BAO), mais a radiação (fótons a 2,7255 K e três neutrinos sem massa).
Serve pra série dizer "cerca de N milhões de anos depois do início, pela conta do modelo",
e pra pôr a marca na régua. Com esses parâmetros a idade de hoje sai 13,79 bilhões, perto
da régua da série (13,797, D11); a diferença some no arredondamento dos episódios.

Uso: python idade-no-desvio.py 30 14.44 6.6
"""
import math
import sys

H0_KM_S_MPC = 67.66
OMEGA_MATERIA = 0.3111
KM_POR_MPC = 3.0856775814913673e19
SEGUNDOS_POR_ANO = 365.25 * 24 * 3600
h = H0_KM_S_MPC / 100
OMEGA_RADIACAO = 2.469e-5 / h**2 * (1 + 0.2271 * 3.046)
OMEGA_LAMBDA = 1 - OMEGA_MATERIA - OMEGA_RADIACAO
ANOS_DE_HUBBLE = KM_POR_MPC / H0_KM_S_MPC / SEGUNDOS_POR_ANO

ANOS_POR_DIA_DA_REGUA = 37_800_000


def expansao(fator_de_escala):
    """H(a)/H0 pra um universo plano com matéria, radiação e constante cosmológica."""
    a = fator_de_escala
    return math.sqrt(OMEGA_RADIACAO / a**4 + OMEGA_MATERIA / a**3 + OMEGA_LAMBDA)


def idade_em_anos(desvio, passos=200_000):
    """t(z) = integral de 0 até a = 1/(1+z) de da / (a H(a)), em anos."""
    a_final = 1 / (1 + desvio)
    soma = 0.0
    largura = a_final / passos
    for i in range(passos):
        a = (i + 0.5) * largura
        soma += largura / (a * expansao(a))
    return soma * ANOS_DE_HUBBLE


def data_na_regua(anos_depois):
    dias = anos_depois / ANOS_POR_DIA_DA_REGUA
    dia_de_janeiro = int(dias) + 1
    minutos = round((dias - int(dias)) * 24 * 60)
    return f"{dia_de_janeiro} de janeiro, {minutos // 60:02d}:{minutos % 60:02d}" if dias < 31 else f"dia {dias:.1f} do ano"


if __name__ == "__main__":
    print(f"hoje (z = 0): {idade_em_anos(0) / 1e9:.3f} bilhões de anos")
    for argumento in sys.argv[1:]:
        z = float(argumento)
        anos = idade_em_anos(z)
        print(f"z = {z:g}: {anos / 1e6:,.0f} milhões de anos depois do início -> {data_na_regua(anos)}")
