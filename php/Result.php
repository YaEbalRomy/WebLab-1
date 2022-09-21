<?php
function drawResult($answer): void
{ ?>
    <tr class="resultFromPhp">
        <th><?php echo $answer[0] ?></th>
        <th><?php echo $answer[1] ?></th>
        <th><?php echo $answer[2] ?></th>
        <th><?php echo $answer[3] ?></th>
        <th><?php echo $answer[4] ?></th>
    </tr>
    <?php
}
