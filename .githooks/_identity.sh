#!/bin/sh
# Identidade permitida neste repositório e identidades bloqueadas.
ALLOWED_NAME="PabloPSCode"
ALLOWED_EMAIL="pscodedesenvolvimento@gmail.com"
# Qualquer nome/e-mail que case com este padrão é recusado (sem diferenciar maiúsculas).
BLOCKED_PATTERN="pablolucio97|pablolucio_@hotmail\.com|54117323\+pablolucio97@users\.noreply\.github\.com"

is_blocked() {
  printf '%s' "$1" | grep -Eiq "$BLOCKED_PATTERN"
}
