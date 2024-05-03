const participants = [];
        const addParticipantBtn = document.getElementById("addParticipant");
        const createGroupsBtn = document.getElementById("createGroups");

        addParticipantBtn.addEventListener("click", function() {
            const nameInput = document.getElementById("name");
            const name = nameInput.value.trim();
            if (name === "") {
                alert("Prašome įvesti vardą ir pavardę.");
                return;
            }
            participants.push(name);
            nameInput.value = "";
            if (participants.length >= 20) {
                addParticipantBtn.disabled = true;
            }
        });

        createGroupsBtn.addEventListener("click", function() {
            const numGroups = parseInt(document.getElementById("numGroups").value);
            if (isNaN(numGroups) || numGroups < 1 || numGroups > 20) {
                alert("Netinkamas grupių skaičius. Įveskite skaičių nuo 1 iki 20.");
                return;
            }

            if (participants.length < 5) {
                alert("Dalyvių skaičius turi būti mažiausiai 5.");
                return;
            }

            const groups = createGroups(participants, numGroups);
            displayGroups(groups);
            console.log(groups);
        });

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createGroups(participants, numGroups) {
            const shuffledParticipants = shuffleArray(participants.slice());
            const groups = [];
            const groupSize = Math.ceil(shuffledParticipants.length / numGroups);

            let startIndex = 0;
            for (let i = 0; i < numGroups; i++) {
                const group = shuffledParticipants.slice(startIndex, startIndex + groupSize);
                groups.push(group);
                startIndex += groupSize;
            }

            return groups;
        }

        function displayGroups(groups) {
            const groupsDiv = document.getElementById("groups");
            groupsDiv.innerHTML = "";

            groups.forEach((group, index) => {
                const groupHeader = document.createElement("h3");
                groupHeader.textContent = `Grupė ${index + 1}:`;
                groupsDiv.appendChild(groupHeader);

                const ul = document.createElement("ul");
                group.forEach(member => {
                    const li = document.createElement("li");
                    li.textContent = member;
                    ul.appendChild(li);
                });
                groupsDiv.appendChild(ul);
            });
        }