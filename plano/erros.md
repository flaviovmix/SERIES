# Fila de erros: SEIRES

O plano tem começo e fim. Esta fila não conclui nunca, e é por isso que ela mora fora do `plano.md`: pra que o plano não fique preso a um item que só o usuário final fecha.

Duas regras que fazem ela funcionar:

- **Só fecha em ✅ quem reportou**, vendo funcionar em produção. Não quem corrigiu.
- **Erro corrigido nasce com o teste que o reproduz**: o teste falha antes da correção e passa depois. Sem isso o mesmo erro volta na mudança seguinte, e a fila vira roda-viva.

Depois da Etapa 13, esta fila passa a ser a principal fonte de teste novo do projeto, porque é ela que mostra o que a realidade quebra de verdade.

---

## Modelo de entrada (copiar)

```markdown
### E<N>: [título curto]
- **Status:** 🔴 reportado | 🟡 em análise | 🔧 corrigido local | 🚀 subido | ✅ validado
- **Data:** DD/MM/AAAA · **Reportado por:** [quem]
- **Descrição:**
- **Como reproduzir:**
- **Causa:**
- **Correção:**
- **Teste que reproduz:**
```

---

## Fila

(vazia)
