import json
import re
import sys
import time
from pathlib import Path
from typing import Any

import requests


ROOT = Path(__file__).resolve().parents[1]
I18N_DIR = ROOT / "src" / "i18n"

PLACEHOLDER_RE = re.compile(r"\{\{\s*[\w.-]+\s*\}\}")


def protect_placeholders(text: str) -> tuple[str, dict[str, str]]:
    tokens: dict[str, str] = {}

    def repl(match: re.Match[str]) -> str:
        token = f"__PH_{len(tokens)}__"
        tokens[token] = match.group(0)
        return token

    protected = PLACEHOLDER_RE.sub(repl, text)
    return protected, tokens


def restore_placeholders(text: str, tokens: dict[str, str]) -> str:
    for token, value in tokens.items():
        text = text.replace(token, value)
    return text


def google_translate(text: str, target_lang: str) -> str:
    endpoint = "https://translate.googleapis.com/translate_a/single"
    for attempt in range(4):
        try:
            response = requests.get(
                endpoint,
                params={
                    "client": "gtx",
                    "sl": "es",
                    "tl": target_lang,
                    "dt": "t",
                    "q": text,
                },
                timeout=20,
            )
            response.raise_for_status()
            payload = response.json()
            return "".join(part[0] for part in payload[0] if part and part[0])
        except Exception:
            if attempt == 3:
                raise
            time.sleep(1.25 * (attempt + 1))
    return text


def translate_text(
    text: str, target_lang: str, cache: dict[str, str]
) -> str:
    if not text.strip():
        return text
    if text in cache:
        return cache[text]

    protected, tokens = protect_placeholders(text)
    translated = google_translate(protected, target_lang)
    restored = restore_placeholders(translated, tokens)
    cache[text] = restored
    return restored


def walk_translate(
    node: Any, target_lang: str, cache: dict[str, str]
) -> Any:
    if isinstance(node, dict):
        return {k: walk_translate(v, target_lang, cache) for k, v in node.items()}
    if isinstance(node, list):
        return [walk_translate(item, target_lang, cache) for item in node]
    if isinstance(node, str):
        return translate_text(node, target_lang, cache)
    return node


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, data: Any) -> None:
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def translate_file(base_file: str, target_lang: str, output_file: str) -> None:
    source_path = I18N_DIR / base_file
    target_path = I18N_DIR / output_file
    source_data = load_json(source_path)
    cache: dict[str, str] = {}
    translated_data = walk_translate(source_data, target_lang, cache)
    save_json(target_path, translated_data)
    print(f"[ok] {output_file} generado ({len(cache)} textos traducidos)", flush=True)


def main() -> None:
    jobs = {
        "app": [
            ("app.es.json", "fr", "app.fr.json"),
            ("app.es.json", "pt", "app.pt.json"),
        ],
        "member": [
            ("member.es.json", "fr", "member.fr.json"),
            ("member.es.json", "pt", "member.pt.json"),
        ],
        "missionary": [
            ("missionary.es.json", "en", "missionary.en.json"),
            ("missionary.es.json", "fr", "missionary.fr.json"),
            ("missionary.es.json", "pt", "missionary.pt.json"),
        ],
    }

    if len(sys.argv) > 1:
        selected = [arg.strip().lower() for arg in sys.argv[1:] if arg.strip()]
    else:
        selected = ["app", "member", "missionary"]

    for scope in selected:
        if scope not in jobs:
            raise ValueError(f"Scope no soportado: {scope}")
        print(f"Traduciendo scope: {scope}", flush=True)
        for base_file, target_lang, output_file in jobs[scope]:
            translate_file(base_file, target_lang, output_file)


if __name__ == "__main__":
    main()
