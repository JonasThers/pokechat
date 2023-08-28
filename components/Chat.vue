<template>
  <div class="chat">
    <div class="chat__banner" :class="pokemonType">PokeChat</div>
    <div class="chat__window" id="chat">
      <div class="chat__window-header">
        <img class="chat__window-avatar" :src="pokemonAvatar" />
        <div class="chat__window-name">
          Hi! You'll be chatting with {{ pokemonName }}!
        </div>
      </div>
      <div class="chat__content">
        <div class="chat__messages">
          <li
            v-for="(messageInChat, index) in messagesInChat"
            :key="index"
            class="chat__message"
            :class="['chat__message--' + messageInChat.sender, pokemonType]"
          >
            {{ messageInChat.content }}
          </li>
        </div>
        <p v-if="isLoadingDots" class="chat__status">
          {{ status }}{{ loadingDot }}
        </p>
      </div>
    </div>
    <form class="chat__actions" @submit="submitMessage">
      <input
        class="chat__actions-input"
        name="message"
        id="message"
        placeholder="Write your message here..."
        v-model="message"
      />
      <button class="chat__actions-button" :class="pokemonType" type="submit">
        Submit
      </button>
      <p v-if="failure">Please type in a valid message</p>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Chat",
  data() {
    return {
      message: "",
      messagesInChat: [],
      status: "",
      failure: false,
      loadingDot: "",
      isLoadingDots: false,
      submitsBeingProcessed: 0,
    };
  },
  methods: {
    submitMessage(e) {
      e.preventDefault();

      this.submitsBeingProcessed++;

      if (!this.message) {
        this.failure = true;
        return;
      }

      this.failure = false;
      this.messagesInChat.push({
        content: this.message,
        sender: "user",
      });
      this.message = "";
      this.scrollToBottom();

      if (this.submitsBeingProcessed === 1) {
        this.scrollToBottom();
        setTimeout(() => {
          this.status = `${this.pokemonName} is typing`;

          this.isLoadingDots = true;

          const interval = setInterval(() => {
            this.generateLoadingDots();
          }, 200);

          setTimeout(() => {
            clearInterval(interval);
          }, 1400);
        }, 700);
      }

      setTimeout(() => {
        this.submitPokemonMessage();
        this.isLoadingDots = false;
        this.status = "";
        this.submitsBeingProcessed--;
        this.scrollToBottom();
      }, 1950);
    },
    generateLoadingDots() {
      this.loadingDot = this.loadingDot + ".";
      if (this.loadingDot === "....") {
        this.loadingDot = "";
      }
    },
    submitPokemonMessage() {
      this.messagesInChat.push({
        content: this.generatePokemonMessage(),
        sender: "pokemon",
      });

      this.status = "";
    },
    generatePokemonMessage() {
      const randomNumber = Math.floor(Math.random() * 3) + 1;

      return `${this.pokemonName}! `.repeat(randomNumber);
    },
    scrollToBottom() {
      const element = document.getElementById("chat");
      element.scrollTop = element.scrollHeight;
    }
  },
  computed: {
    ...mapGetters({
      pokemon: "pokemon",
    }),
    pokemonName() {
      return this.pokemon.name
        ? this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)
        : "...";
    },
    pokemonAvatar() {
      return this.pokemon.sprites
        ? this.pokemon.sprites.versions["generation-i"]["red-blue"]
            .front_default
        : null;
    },
    pokemonType() {
      return this.pokemon.types ? this.pokemon.types[0].type.name : null;
    },
  },
  watch: {
    pokemon() {
      this.messagesInChat = [];
    },
  },
};
</script>

<style scoped>
.normal {
  background: var(--normal);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.fire {
  background: var(--fire);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.water {
  background: var(--water);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.electric {
  background: var(--electric);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.grass {
  background: var(--grass);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.ice {
  background: var(--ice);
  text-shadow: 0px 2px var(--white);
}

.fighting {
  background: var(--fighting);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.poison {
  background: var(--poison);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.ground {
  background: var(--ground);
  text-shadow: 0px 2px var(--white);
}

.flying {
  background: var(--flying);
  text-shadow: 0px 2px var(--white);
}

.psychic {
  background: var(--psychic);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.bug {
  background: var(--bug);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.rock {
  background: var(--rock);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.ghost {
  background: var(--ghost);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.dragon {
  background: var(--dragon);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.dark {
  background: var(--dark);
  text-shadow: 0px 2px var(--white);
}

.steel {
  background: var(--steel);
  text-shadow: 0px 2px var(--white);
}

.fairy {
  background: var(--fairy);
  color: var(--white);
  text-shadow: 0px 1.5px var(--black);
}

.chat {
  box-shadow: var(--shadow);
}

.chat__messages {
  display: flex;
  flex-direction: column;
}

.chat__window {
  height: 350px;
  width: 320px;
  padding: 7.5px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.chat__banner {
  padding: 15px 10px 10px;
}

.chat__window-header {
  margin-bottom: 10px;
  text-align: center;
}

.chat__window-avatar {
  height: 70px;
  margin-bottom: 5px;
}

.chat__window-name {
  line-height: 1.5rem;
  font-size: 14px;
}

.chat__message {
  list-style-type: none;
  border-radius: 5px 5px 0 5px;
  padding: 10px 15px 5px;
  margin-bottom: 5px;
  font-size: 14px;
  width: 55%;
  line-height: 1.25rem;;
}

.chat__message--user {
  align-self: end;
}

.chat__status {
  text-align: left;
  font-size: 12px;
}

.chat__actions {
  display: flex;
  height: 32px;
}

.chat__actions-input {
  width: 70%;
  padding: 5px;
  border: 0;
  font-family: pokemonFont;
  font-size: 8px;
  color: var(--black);
  text-transform: uppercase;
  border-top: 1px solid var(--gray);
}

.chat__actions-input:focus {
  outline: none;
}

.chat__actions-button {
  width: 30%;
  padding-top: 5px;
  font-size: 12px;
  border-radius: 0%;
  border: 0;
}
</style>
