<script setup lang="ts">
import { traiteurData } from '~/data/traiteur';

const joursSelectionnes = ref<string[]>([]);

const toggleJour = (jour: string) => {
    if (joursSelectionnes.value.includes(jour)) {
        joursSelectionnes.value = joursSelectionnes.value.filter(j => j !== jour);
    } else {
        joursSelectionnes.value.push(jour);
    }
}

const messageCommande = computed(() => {
    const jours = joursSelectionnes.value.join(", ");
    return `Bonjour Aurélien, je souhaite réserver le portage de repas pour les jours suivants : ${jours}. Pouvez-vous me confirmer la livraison ?`;
});

const smsHref = computed(() => {
    return `sms:+33609373971?body=${encodeURIComponent(messageCommande.value)}`;
});

const mailHref = computed(() => {
    const sujet = `Réservation portage de repas (${joursSelectionnes.value.join(", ")})`;
    return `mailto:${traiteurData.contact.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(messageCommande.value)}`;
});

const devisMailHref = computed(() => {
    const sujet = "Demande de devis traiteur événementiel";
    const corps = "Bonjour Aurélien, \n\nJe souhaite obtenir un devis pour un événement :\n- Date prévue : \n- Nombre de convives : \n- Type de prestation (mariage, réception, séminaire..) : \n\nCordialement,";
    return `mailto:${traiteurData.contact.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
});
</script>

<template>
    <div class="min-h-screen bg-bg text-ink font-sans antialiased">
        <header class="fixed top-0 inset-x-0 z-40 h-fit min-h-16 border-b-2 border-ink bg-bg">
            <div class="max-w-6xl mx-auto my-6 px-4 sm:px-6 h-full flex items-center justify-between gap-3">
                <a href="/"
                    class="flex items-center gap-3 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                    <img src="/images/logo_popotte_192x121.png" alt="Logo de La Popotte à Gros Papa" width="64"
                        height="40" class="h-10 w-auto shrink-0 object-contain" onerror="this.style.display='none'">
                    <span class="w-2.5 h-8 bg-brand shrink-0"></span>
                    <div class="min-w-0">
                        <span
                            class="block text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-brand wrap-break-word">
                            Artisan Traiteur - Prades (07)
                        </span>
                        <span
                            class="font-serif text-lg sm:text-2xl font-bold tracking-wide text-ink leading-none wrap-break-word">
                            {{ traiteurData.enseigne }}
                        </span>
                    </div>
                </a>

                <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-ink">
                    <a href="#savoir-faire" class="hover:text-brand transition-colors">
                        Traiteur & Portage
                    </a>
                    <a href="#menu-semaine" class="hover:text-brand transition-colors">
                        Menu de la semaine
                    </a>
                    <a href="#contact" class="hover:text-brand transition-colors">
                        Horaires & Accès
                    </a>
                </nav>

                <a :href="traiteurData.contact.telephoneHref"
                    class="bg-brand text-white hover:bg-brand-hover text-sm font-medium px-4 py-2.5 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink shadow-sm">
                    <span>{{ traiteurData.contact.telephoneDisplay }}</span>
                </a>
            </div>
        </header>

        <main id="main-content" class="pt-18">
            <!-- Section Hero -->
            <section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <!-- Photo -->
                    <div class="lg:col-span-5 relative">
                        <div class="absolute -left-3 top-6 bottom-6 w-3 bg-brand hidden sm:block"></div>
                        <div class="border-2 border-ink bg-surface-soft aspect-4/5 overflow-hidden relative">
                            <img src="/images/chef-buffet.png"
                                alt="Aurélien Malugani et son équipe devant un buffet traiteur"
                                class="w-full h-full object-cover" onerror="this.style.display='none'">
                        </div>
                        <div class="p-6 flex flex-col justify-end h-full text-stone-600 text-sm">
                            <p class="font-bold text-ink">
                                Photo de l'équipe / Buffet
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Titre encadré et présentation -->
                <div class="lg:col-span-7 space-y-6">
                    <div
                        class="border-4 border-ink p-6 sm:p-8 relative bg-bg shadow-[8px_8px_0px_0px-var(--color-brand)]">
                        <span
                            class="block text-xs font-bold uppercase tracking-[0.2em] text-brand mb-2 wrap-break-word">
                            {{ traiteurData.slogan }}
                        </span>
                        <h1 class="font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight wrap-break-word">
                            {{ traiteurData.enseigne }}
                        </h1>
                        <p class="text-xs font-semibold uppercase tracking-widest text-ink-muted mt-3">
                            {{ traiteurData.parcours }}
                        </p>
                    </div>

                    <div class="space-y-3 text-base text-ink/90 leading-relaxed pt-1">
                        <p>
                            <strong>{{ traiteurData.chef }}</strong>
                            {{ traiteurData.description[0] }}
                            <strong>
                                {{ traiteurData.description[1] }}
                            </strong>
                            {{ traiteurData.description[2] }}
                        </p>
                        <p class="font-semibold text-brand border-l-4 border-brand pl-3">
                            <cite>{{ traiteurData.devises }}</cite>
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-4 pt-1">
                        <a href="#menu-semaine"
                            class="bg-brand hover:bg-brand-hover text-bg text-sm font-bold uppercase tracking-wider px-6 py-3.5 transition-colors">
                            Commander un repas livré
                        </a>
                        <a href="#contact"
                            class="border border-ink hover:bg-ink hover:text-bg text-ink text-sm font-bold uppercase tracking-wider px-6 py-3.5 transition-colors">
                            Demander un devis traiteur
                        </a>
                    </div>

                    <!-- Bandeau infos rapides -->
                    <div class="grid sm:grid-cols-3 border-2 border-ink divide-y sm:divide-x divide-ink mt-6 text-xs">
                        <div class="p-4 bg-brand text-bg">
                            <span class="block font-bold uppercase tracking-wider mb-1">
                                Nos horaires
                            </span>
                            <span class="font-semibold block">
                                Lun - Sam : 9h00 - 18h00
                            </span>
                        </div>
                        <div class="p-4 bg-brand text-bg">
                            <span class="block font-bold uppercase tracking-wider mb-1">
                                Nous contacter
                            </span>
                            <span class="font-semibold block">
                                {{ traiteurData.contact.telephoneDisplay }}
                            </span>
                        </div>
                        <div class="p-4 bg-brand text-bg">
                            <span class="block font-bold uppercase tracking-wider mb-1">
                                Notre atelier
                            </span>
                            <span class="font-semibold block">
                                {{ traiteurData.contact.adresse }}, {{ traiteurData.contact.ville }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Section savoir-faire -->
            <section id="savoir-faire" class="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
                <div class="grid md:grid-cols-2 gap-8 md:gap-12">
                    <!-- Portage -->
                    <div class="bg-ink text-bg p-8 sm:p-10 flex flex-col justify-between">
                        <div class="space-y-4">
                            <span class="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                                {{ traiteurData.prestations.portage.badge }}
                            </span>
                            <h2 class="font-serif text-3xl font-bold text-bg leading-snug">
                                {{ traiteurData.prestations.portage.title }}
                            </h2>
                            <p class="text-bg/90 text-sm leading-relaxed">
                                {{ traiteurData.prestations.portage.description }}
                            </p>
                            <div class="aspect-auto bg-ink border border-bg/20 overflow-hidden my-4">
                                <img src="/images/plat-portage.png" alt="Barquettes de repas complets fait maison"
                                    class="w-full h-full object-cover" onerror="this.style.display='none'">
                            </div>
                            <p class="text-sm font-semibold text-brand-light pt-3 border-t border-bg/20">
                                {{ traiteurData.prestations.portage.formule }}
                            </p>
                        </div>
                        <div class="pt-6">
                            <a href="#menu-semaine"
                                class="inline-block bg-brand hover:bg-brand-hover text-bg text-xs font-bold uppercase tracking-wider px-5 py-3 transition-colors">
                                Composer mon menu de la semaine
                            </a>
                        </div>
                    </div>
                    <!-- Evénementiel -->
                    <div class="bg-bg text-ink border-4 border-ink p-8 sm:p-10 flex flex-col justify-between">
                        <div class="space-y-4">
                            <span class="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                                {{ traiteurData.prestations.evenementiel.badge }}
                            </span>
                            <h2 class="font-serif text-3xl font-bold text-ink leading-snug">
                                {{ traiteurData.prestations.evenementiel.title }}
                            </h2>
                            <p class="text-ink/90 text-sm leading-relaxed">
                                {{ traiteurData.prestations.evenementiel.description }}
                            </p>
                            <p class="text-sm font-bold text-ink bg-surface-soft border-l-4 border-brand p-3">
                                {{ traiteurData.prestations.evenementiel.specialite }}
                            </p>
                            <div class="aspect-auto bg-surface-soft border border-ink/20 overflow-hidden my-4">
                                <img src="/images/plat-traiteur.png" alt="Bouchées et Assiettes traiteurs dressées pour mariages et réceptions."
                                    class="w-full h-full object-cover" onerror="this.style.display='none'">
                            </div>
                            <p class="text-sm font-semibold text-ink pt-3 border-t border-ink/20">
                                {{ traiteurData.prestations.evenementiel.formule }}
                            </p>
                            <div class="pt-6">
                                <a :href="devisMailHref"
                                    class="inline-block bg-brand hover:bg-brand-hover text-bg text-xs font-bold uppercase tracking-wider px-5 py-3 transition-colors">
                                    Demander un devis sur-mesure
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Menu de la semaine -->
            <section id="menu-semaine" class="bg-surface-soft border-y-2 border-ink py-16 sm:py-20">
                <div class="max-w-6xl mx-auto px-4 sm:px-6">
                    <div class="text-center max-w-2xl mx-auto mb-12">
                        <span class="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                            Tous nos plats sont faits maison
                        </span>
                        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ink mt-2">
                            Menu de la semaine (Portage)
                        </h2>
                        <p class="text-sm text-ink/90 mt-3">
                            Cochez les jours souhaités (clavier ou souris) pour préparer automatiquement votre message
                            de réservation (commande 24h à l'avance).
                        </p>
                    </div>

                    <div class="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        <button v-for="item in traiteurData.menuSemaine" key="item.id" type="button"
                            :aria-pressed="joursSelectionnes.includes(item.jour)" @click="toggleJour(item.jour)" :class="[
                                'text-left p-6 border-2 transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/50',
                                joursSelectionnes.includes(item.jour)
                                    ? 'bg-bg border-brand shadow-[4px_4px_0px_0px_var(--color-brand)]'
                                    : 'bg-bg border-ink hover:border-brand'
                            ]">
                            <div class="space-y-3 w-full">
                                <div class="flex items-center justify-between border-b border-ink/20 pb-2">
                                    <span class="font-serif text-xl font-bold text-ink">{{ item.jour }}</span>
                                    <span :class="[
                                        'w-5 h-5 border-2 flex items-center justify-center text-xs font-bold',
                                        joursSelectionnes.includes(item.jour)
                                            ? 'bg-brand border-brand text-bg'
                                            : 'border-ink text-transparent'
                                    ]" aria-hidden="true">
                                        <template v-if="joursSelectionnes.includes(item.jour)">
                                            &#x2713;
                                        </template>
                                    </span>
                                </div>

                                <div class="text-xs space-y-2.5 text-ink/80">
                                    <div>
                                        <span class="block font-bold uppercase text-xs text-brand">
                                            Entrée
                                        </span>
                                        <span>
                                            {{ item.entree }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="block font-bold uppercase text-xs text-brand">
                                            Plat
                                        </span>
                                        <span>
                                            {{ item.plat }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="block font-bold uppercase text-xs text-brand">
                                            Fromage ou Dessert
                                        </span>
                                        <span>
                                            {{ item.dessert }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-5 pt-2 border-t border-ink/20 w-full text-center">
                                <span :class="[
                                    'text-xs font-bold uppercase tracking-wider',
                                    joursSelectionnes.includes(item.jour)
                                        ? 'text-brand'
                                        : 'text-ink/50'
                                ]">
                                    {{ joursSelectionnes.includes(item.jour) ? 'Sélectionné' : 'Choisir ce jour' }}
                                </span>
                            </div>
                        </button>
                    </div>

                    <!-- Bandeau d'action SMS / EMAIL / APPEL -->
                    <div v-if="joursSelectionnes.length > 0" aria-live="polite"
                        class="mt-8 bg-ink text-bg p-6 sm:p-8 border-2 border-ink flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div class="space-y-1">
                            <span class="text-sm font-bold uppercase tracking-wider text-brand-light">
                                Votre pré-sélection ({{ joursSelectionnes.length }} jour{{ joursSelectionnes.length > 1
                                    ? 's' : '' }})
                            </span>
                            <p class="font-serif text-base uppercase font-bold">
                                {{ joursSelectionnes.join(' - ') }}
                            </p>
                            <p class="text-xs text-ink/30">
                                Envoyez votre sélection en un clic : le message est déjà rédigé avec vos jours choisis.
                            </p>
                        </div>

                        <div class="flex flex-wrap gap-3">
                            <a :href="smsHref"
                                class="bg-brand hover:bg-brand-hover text-bg text-xs font-bold uppercase tracking-wider px-5 py-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-bg">
                                Envoyer par SMS
                            </a>
                            <a :href="mailHref"
                                class="bg-bg hover:bg-stone/20 text-ink text-xs font-bold uppercase tracking-wider px-5 py-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-bg">
                                Envoyer par Email
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer id="contact" class="bg-ink text-bg pt-16 pb-10">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-12 pb-12 border-b border-bg/20">
                <div class="space-y-4">
                    <span class="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
                        Artisan Traiteur
                    </span>
                    <h2 class="font-display text-3xl tracking-wide text-bg">
                        {{ traiteurData.enseigne }}
                    </h2>
                    <p class="text-sm text-bg/80">
                        {{ traiteurData.chef }} - {{ traiteurData.parcours }}
                    </p>
                </div>

                <div class="space-y-3 text-sm">
                    <h3 class="font-bold uppercase tracking-wider text-brand-light text-sm">
                        Renseignements & Horaires
                    </h3>
                    <ul class="space-y-2 text-bg/80">
                        <li v-for="horaire in traiteurData.contact.horaires" :key="horaire.jours"
                            class="flex justify-between max-w-xs border-b border-ink/80 pb-1.5">
                            <span>{{ horaire.jours }}</span>
                            <span class="font-semibold text-bg">
                                {{ horaire.heures }}
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="space-y-3 text-sm">
                    <h3 class="font-serif font-bold uppercase tracking-wider text-brand-light text-sm">
                        Nous trouver & Nous écrire
                    </h3>
                    <p class="font-semibold text-base text-bg">
                        <a :href="traiteurData.contact.telephoneHref" class="hover:text-brand-light transition-colors">
                            {{ traiteurData.contact.telephoneDisplay }}
                        </a>
                    </p>
                    <p class="text-bg/80">
                        {{ traiteurData.contact.adresse }}<br />
                        {{ traiteurData.contact.codePostal }} {{ traiteurData.contact.ville }}
                    </p>
                    <p>
                        <a :href="`mailto:${traiteurData.contact.email}`" class="text-brand-light hover:underline">
                            {{ traiteurData.contact.email }}
                        </a>
                    </p>
                </div>
            </div>

            <div
                class="max-w-6xl mx-auto px-4 sm:px-6 pt-8 text-xs text-bg/70 flex flex-col sm:flex-row justify-between gap-2">
                <span>
                    {{ new Date().getFullYear() }} {{ traiteurData.enseigne }}
                </span>
                <span>
                    {{ traiteurData.contact.adresse }}, {{ traiteurData.contact.codePostal }} {{ traiteurData.contact.ville }}
                </span>
            </div>
        </footer>
    </div>
</template>