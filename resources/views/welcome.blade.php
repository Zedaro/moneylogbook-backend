<x-skeleton>

    <!--    <select name="language" class="language-select">
            <option value="Deutsch">🇩🇪 Deutsch</option>
            <option value="English">🇺🇸 English</option>
        </select>-->

    <div class="language-switcher">
        <button onclick="changeLanguage('de')" id="de" class="lang de">🇩🇪 DE</button>
        <button onclick="changeLanguage('en')" id="en" class="lang en">🇺🇸 EN</button>
    </div>

    <div class="buttons-div">
        <button onclick="location.href = '/auth/signup'" class="register-button">{{ __('messages.register') }}</button>
        <a href="/auth/login" class="a-user-circle">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
        </a>
        <button onclick="location.href = '/auth/login'" class="login-button">{{ __('messages.login') }}</button>
    </div>

    <main>

        <x-card>
            <p class="card-text card-text1"><span class="moneylogbook-string">Moneylogbook</span> {{ __('messages.moneylogbook') }}</p>
        </x-card>

        <x-card>
            <p class="card-text card-text2">
                {{ __('messages.you') }}
                <span class="red-text">{{ __('messages.dont-feel-like') }}</span>
            {{ __('messages.advantages') }}
            <!--                Du hast <span class="red-text">keine Lust</span>, ständig irgendwelche Passwörter und Ziffern für Dein Online-Bankings einzugeben? Du hast zu Hause Geld gebunkert und hältst den Geldstand noch auf einem Zettel oder einer digitalen Notiz fest? Und Du willst keine App benutzen, die Daten von Deinem Konto abfragt oder abliest?-->
            </p>
        </x-card>

        <x-card>
            <p class="card-text card-text3">{{ __('messages.then') }} <span class="moneylogbook-string">Moneylogbook</span> {{ __('messages.features') }}
            <!--                genau richtig für Dich!
                Erstelle Pseudo-Konten, trage Deine einzelnen sowie regelmäßigen Aus- und Einnahmen manuell ein und gib Umbuchungen an. So hast Du an einem Ort die Übersicht über Deine Finanzen. Und das egal, an welchem Gerät Du Dich gerade befindest.-->
            </p>
        </x-card>

        <!-- Bildgallerie mit Screenshots aus der App -->
        <div class="splide">
            <div class="splide__track">
                <ul class="splide__list">
                    <li class="splide__slide"><img src="/pictures/new-transaction-form.png"></li>
                    <li class="splide__slide"><img src="/pictures/money-account-list.png" alt="Form for saving a new transaction in the app"></li>
                </ul>
            </div>
        </div>

    </main>

    <footer>
        <a href="">{{ __('messages.legal-notice') }}</a>
    </footer>



</x-skeleton>
