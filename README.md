# shared-lib

Intern npm-pakke publisert til GitHub Packages som `@the-most-secure-supply-chain-ever-maaan/shared-lib`.

## Oppsett for utviklere (én gang)

For å installere pakken lokalt trenger npm et token med lesetilgang til GitHub Packages. Bruk et eget token som bare kan lese pakker, og gi det bare til npm-prosessen.

### 1. Lag et eget lesetoken

Opprett en personal access token (classic) under GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic):

- Scope: **bare** `read:packages`
- Utløpsdato: kort, for eksempel 30 dager
- Bruker organisasjonen SSO: velg «Configure SSO» og autoriser tokenet for organisasjonen

npm-registryet i GitHub Packages støtter bare classic-tokens, derfor ikke fine-grained.

### 2. Lagre tokenet i nøkkelringen

På macOS:

```bash
security add-generic-password -a "$USER" -s gh-packages-read -w
```

Kommandoen spør etter tokenet, så det havner ikke i shell-historikken. På Linux kan du bruke `secret-tool` eller tilsvarende.

### 3. Gi tokenet bare til npm

Legg denne funksjonen i `~/.zshrc` eller `~/.bashrc`:

```bash
npmgh() {
  GITHUB_TOKEN="$(security find-generic-password -a "$USER" -s gh-packages-read -w)" npm "$@"
}
```

Bruk `npmgh` i stedet for `npm` når du trenger pakker fra GitHub Packages:

```bash
npmgh ci
npmgh i
```

Tokenet hentes fra nøkkelringen når kommandoen kjøres, og settes bare for den ene npm-prosessen. Det eksporteres ikke til shellet, så andre programmer du starter ser det ikke. `.npmrc` i prosjektet leser `GITHUB_TOKEN` og bruker den mot `npm.pkg.github.com`.

Prosesser som npm selv starter, for eksempel install-scripts i avhengigheter, arver tokenet. Derfor skal det bare kunne lese pakker. Bruk gjerne `--ignore-scripts` (`npmgh ci --ignore-scripts`), slik CI gjør.

### Ikke gjør dette

- **`export GITHUB_TOKEN=$(gh auth token)` i shell-profilen.** Da får alle prosesser du starter `gh`-tokenet ditt, som ofte har bred tilgang (repo, workflow, org). Har du lagt det inn tidligere: fjern linjen, start en ny terminal, og fjern scopet igjen med `gh auth refresh -r read:packages`.
- **`npm login` mot `npm.pkg.github.com`.** Den lagrer tokenet i klartekst i `~/.npmrc`.
- **Token direkte i `.npmrc` i prosjektet.** Fila er committet og deles med alle.


### Bruke pakken i et annet prosjekt

Legg til `.npmrc` i prosjektet:

```
@the-most-secure-supply-chain-ever-maaan:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Installer deretter pakken, med oppsettet over:

```bash
npmgh i @the-most-secure-supply-chain-ever-maaan/shared-lib
```
