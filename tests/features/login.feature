Feature: Login
  En tant qu'utilisateur
  Je veux pouvoir me logguer et voir la home des ventes

  Scenario: affichage de la home
    Given un utilisateur sur la page de login
    When je me log avec le mail "check_vente_fr@vente-privee.com" et mot de passe "azerty"
    Then je peux voir la home des ventes
